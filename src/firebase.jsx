import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYTMGRUuzSUIIGKBnqTEAdB3hrTxcITI8",
  authDomain: "linkedin-clone-47867.firebaseapp.com",
  projectId: "linkedin-clone-47867",
  storageBucket: "linkedin-clone-47867.appspot.com",
  messagingSenderId: "147610833089",
  appId: "1:147610833089:web:d4ca22ffc50864b64a8440",
  measurementId: "G-4GS93Z3MVF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, Storage
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

// Export Firebase services for use in other parts of the app
export { auth, provider, storage };
export default db;
