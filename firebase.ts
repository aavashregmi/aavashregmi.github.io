
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsZANR09EdzYldpPMX5lyGZ3D2NCilgms",
  authDomain: "myportfolio-ad759.firebaseapp.com",
  projectId: "myportfolio-ad759",
  storageBucket: "myportfolio-ad759.firebasestorage.app",
  messagingSenderId: "526860077275",
  appId: "1:526860077275:web:d16612a15431edf1ad64fe",
  measurementId: "G-CX4KLDWK62"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
