import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfmRA1hE5vn0qZG95F5PwXlqK_i05-zC4",
  authDomain: "blog-project-3dab3.firebaseapp.com",
  projectId: "blog-project-3dab3",
  storageBucket: "blog-project-3dab3.firebasestorage.app",
  messagingSenderId: "1075816080371",
  appId: "1:1075816080371:web:c74a96092e3f816a922886",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };
