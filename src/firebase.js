import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBoLKYcMVa-e_iYsNsBn72UPfOJdjOghAg",
//   authDomain: "auth-demo-1dd9f.firebaseapp.com",
//   projectId: "auth-demo-1dd9f",
//   storageBucket: "auth-demo-1dd9f.appspot.com",
//   messagingSenderId: "352032993963",
//   appId: "1:352032993963:web:dda253c6528eed01493dee",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDR2-LQIGfw7DikxiS7tSbAebEWnqbAa4Y",
  authDomain: "t4-registration.firebaseapp.com",
  projectId: "t4-registration",
  storageBucket: "t4-registration.appspot.com",
  messagingSenderId: "649803370870",
  appId: "1:649803370870:web:30b468edc4b1e4d902aa57"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}


