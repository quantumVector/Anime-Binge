import { initializeApp } from "firebase/app";
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { MainNotesTypes } from "../lib/types";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

''

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getFirebaseData = async (collectionName: string, documentName: string) => {
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

export const updateFirebaseNotes = async (data: MainNotesTypes.Note, operation?: 'remove') => {
    try {
        const docRef = doc(db, 'notes', '02rkIUrFiJm5SxSCZLf1');

        await updateDoc(docRef, {
            data: operation === 'remove' ? arrayRemove(data) : arrayUnion(data),
        });
    } catch(e) {
        console.error("Error updating document: ", e);
    }
}

export default db;