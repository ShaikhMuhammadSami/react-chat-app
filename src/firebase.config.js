import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuQt2ptHdGkM_M9BCyod_RYBN-H-x1Btg",
  authDomain: "chat-app-48696.firebaseapp.com",
  projectId: "chat-app-48696",
  storageBucket: "chat-app-48696.firebasestorage.app",
  messagingSenderId: "574668312325",
  appId: "1:574668312325:web:935d1713bfbf3f0e8cb16c",
  measurementId: "G-06HVD1YZZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);