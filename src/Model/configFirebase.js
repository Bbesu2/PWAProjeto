import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB31IZTdVVqvpR42akBqg1MethvAozL_20",
  authDomain: "projetopwa-1c79a.firebaseapp.com",
  projectId: "projetopwa-1c79a",
  storageBucket: "projetopwa-1c79a.appspot.com",
  messagingSenderId: "262652544848",
  appId: "1:262652544848:web:da4b58af50dbdfccd28e55",
  measurementId: "G-SQJPC0BCWX"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
