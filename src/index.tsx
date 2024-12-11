import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(
  {
  apiKey: "AIzaSyCLDrAFwU4o4IUtEk3MoDfhyRPsnsISImc",
  authDomain: "my-app-2-d2439.firebaseapp.com",
  projectId: "my-app-2-d2439",
  storageBucket: "my-app-2-d2439.firebasestorage.app",
  messagingSenderId: "788463909065",
  appId: "1:788463909065:web:3b594b0055d7bd88ab3518",
  measurementId: "G-X1853Z3VKZ"
});
const analytics = getAnalytics(app);

interface FirebaseContextType {
  auth: ReturnType<typeof getAuth>;
  firestore: ReturnType<typeof getFirestore>;
}

export const Context = createContext<FirebaseContextType | null>(null)

const auth = getAuth(app);
const firestore = getFirestore(app);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={{
      auth,
      firestore
    }}>
      <App />
    </Context.Provider>
  </StrictMode>,
)
