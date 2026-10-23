import React, { useState } from "react";
import {
  X,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function AuthModal({
  isOpen,
  mode,
  setMode,
  onClose,
  onSuccess,
  pendingAction,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    try {
      if (mode === "login") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPassword,
        );
        onSuccess({
          name: userCredential.user.displayName || trimmedEmail.split("@")[0],
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
      } else {
        if (!name.trim()) {
          setError("Please provide your name.");
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPassword,
        );
        await updateProfile(userCredential.user, { displayName: name.trim() });

        onSuccess({
          name: name.trim(),
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
      }
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account already exists with this email. Please log in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0b1326] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,210,255,0.25)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center mx-auto mb-3 text-cyan-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white">
            {mode === "login"
              ? "Sign In to Tech SQB"
              : "Create Tech SQB Account"}
          </h3>
          {pendingAction ? (
            <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 mt-2">
              Authentication required to access{" "}
              <strong>{pendingAction.item.title}</strong>.
            </p>
          ) : (
            <p className="text-xs text-slate-400 mt-1">
              Cloud accounts with persistent database authentication.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === "login"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === "register"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all cursor-pointer mt-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>
                  {mode === "login" ? "Verify & Login" : "Register Account"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
