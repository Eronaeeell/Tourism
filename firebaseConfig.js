import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyACLwfrs7fOPBFEBbZTI4MiGWbTGn10haM",
  authDomain: "tourism-3cb2e.firebaseapp.com",
  projectId: "tourism-3cb2e",
  storageBucket: "tourism-3cb2e.firebasestorage.com",
  messagingSenderId: "751462981792",
  appId: "1:751462981792:web:9608aa7d1e3815466429c5",
  measurementId: "G-38ZHTY26HV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
