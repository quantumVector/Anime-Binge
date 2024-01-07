import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDBData = async (collectionName: string, documentName: string) => {
    try {
        const docRef = doc(db, collectionName, documentName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error(e);
    }
}

export default db;