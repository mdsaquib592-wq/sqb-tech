import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0OeGAq3ErN4u1ypzBH-Hs_SG1h8gzbTk",
  authDomain: "sqb-tech.firebaseapp.com",
  projectId: "sqb-tech",
  storageBucket: "sqb-tech.firebasestorage.app",
  messagingSenderId: "345610637795",
  appId: "1:345610637795:web:a829814b822d562a9d90d6",
  measurementId: "G-24DDLV9J67",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
