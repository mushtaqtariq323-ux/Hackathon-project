import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiYab5-u_5y6IOXPKnC9OzMwXR-wLLNXE",
  authDomain: "hackathonproject-26ace.firebaseapp.com",
  databaseURL: "https://hackathonproject-26ace-default-rtdb.firebaseio.com",
  projectId: "hackathonproject-26ace",
  storageBucket: "hackathonproject-26ace.firebasestorage.app",
  messagingSenderId: "304076164276",
  appId: "1:304076164276:web:8e522e8612b95d5e1c1be1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
  app, auth, db, ref, set, get, push,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, onAuthStateChanged, signOut
};
