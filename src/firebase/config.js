import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBhauFdwPBkl0E8-cGkZWiO6F_yOb_UVfE",
    authDomain: "notice-17a67.firebaseapp.com",
    projectId: "notice-17a67",
    storageBucket: "notice-17a67.appspot.com",
    messagingSenderId: "375268884880",
    appId: "1:375268884880:web:cb8a82c71cfa32a3e8b315",
    measurementId: "G-88GNVQRB97"
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(firebase_app);
export {storage};

export default firebase_app;