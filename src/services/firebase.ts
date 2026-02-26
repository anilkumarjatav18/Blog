
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDUSpTo4Ow5969FspIXM8D-woMJY3eEXg",
  authDomain: "blog-30b2e.firebaseapp.com",
  projectId: "blog-30b2e",
  databaseURL: "https://blog-30b2e-default-rtdb.firebaseio.com/",
  storageBucket: "blog-30b2e.firebasestorage.app",
  messagingSenderId: "945606574823",
  appId: "1:945606574823:web:62b2e122a312b4db7c1842",
  measurementId: "G-Y9FEMGEENK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app);