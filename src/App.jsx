import React, { useState, useEffect } from "react";
import {
  initialSoftwareProducts,
  initialWebServices,
} from "./data/catalogData";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HorizontalSlider from "./components/HorizontalSlider";
import About from "./components/About";
import Contact from "./components/Contact";
import AuthModal from "./components/AuthModal";
import ActionModal from "./components/ActionModal";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";

// Firebase Imports
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// Designated Master Admin Email
const ADMIN_EMAIL = "admin@sqbtech.com";

export default function App() {
  const [softwareList, setSoftwareList] = useState(initialSoftwareProducts);
  const [servicesList, setServicesList] = useState(initialWebServices);

  // Authenticated User State (Loaded from Firebase)
  const [user, setUser] = useState(null);

  // Check if logged-in user is Master Admin
  const isAdmin = Boolean(
    user &&
    user.email &&
    user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase(),
  );

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [pendingAction, setPendingAction] = useState(null);
  const [activeAction, setActiveAction] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // 1. Listen for persistent user logins
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-Time Database Sync for Software Products
  useEffect(() => {
    const q = query(collection(db, "software_products"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Merge newly added DB items in front of default static items
      setSoftwareList([...dbProducts, ...initialSoftwareProducts]);
    });
    return () => unsubscribe();
  }, []);

  // 3. Real-Time Database Sync for Web Services
  useEffect(() => {
    const q = query(collection(db, "web_services"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbServices = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Merge newly added DB items in front of default static items
      setServicesList([...dbServices, ...initialWebServices]);
    });
    return () => unsubscribe();
  }, []);

  // Intercept Download/Purchase if user is not logged in
  const handleProtectedAction = (item, actionType) => {
    if (!user) {
      setPendingAction({ item, actionType });
      setAuthMode("login");
      setAuthModalOpen(true);
    } else {
      setActiveAction({ item, actionType });
    }
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setAuthModalOpen(false);

    if (authenticatedUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setShowAdmin(true);
    }

    if (pendingAction) {
      setActiveAction(pendingAction);
      setPendingAction(null);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowAdmin(false);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      <Navbar
        user={user}
        isAdmin={isAdmin}
        onOpenAuth={(mode) => {
          setPendingAction(null);
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        onToggleAdmin={() => setShowAdmin(!showAdmin)}
        showAdmin={showAdmin}
      />

      {isAdmin && showAdmin && <AdminPanel />}

      <Hero
        user={user}
        onOpenAuth={(mode) => {
          setPendingAction(null);
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
      />

      <HorizontalSlider
        id="software-slider"
        title="Software Products Marketplace"
        subtitle="Swipe to browse all software items. Real-time updates automatically sync when new products are added by the Admin."
        badgeText="Direct Software Downloads"
        items={softwareList}
        type="software"
        user={user}
        onProtectedAction={handleProtectedAction}
      />

      <HorizontalSlider
        id="services-slider"
        title="Professional Web Services"
        subtitle="Browse web services updated in real time directly from our cloud database."
        badgeText="Custom Web Engineering"
        items={servicesList}
        type="service"
        user={user}
        onProtectedAction={handleProtectedAction}
      />

      <About />
      <Contact />
      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        setMode={setAuthMode}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingAction(null);
        }}
        onSuccess={handleAuthSuccess}
        pendingAction={pendingAction}
      />

      <ActionModal
        activeAction={activeAction}
        onClose={() => setActiveAction(null)}
        user={user}
      />
    </div>
  );
}
