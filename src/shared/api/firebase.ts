import { initializeApp } from "firebase/app";
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { FormData, MainNotesTypes } from "../lib/types";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getFirebaseData = async (collectionName: string, documentName: string) => {
    const docRef = doc(db, collectionName, documentName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such document!");
    }
}

export interface ReturnUpdateFirebaseNotes {
    data: MainNotesTypes.Note[];
}

export const useFirebase = async ({ noteData, operation }: FormData): Promise<MainNotesTypes.Note[]> => {
    const docRef = doc(db, 'notes', '02rkIUrFiJm5SxSCZLf1');

    switch (operation) {
        case 'add':
            await updateDoc(docRef, {
                data: arrayUnion(noteData),
            });
            break;
        case 'remove':
            await updateDoc(docRef, {
                data: arrayRemove(noteData),
            });
            break;
        case 'update':
            const docSnapshot = await getDoc(docRef);
            const currentData = docSnapshot.data() as ReturnUpdateFirebaseNotes;
            const updatedArray = currentData.data.map((item: MainNotesTypes.Note) =>
                item.id === noteData.id ? noteData : item
            );

            await updateDoc(docRef, {
                data: updatedArray,
            });
            break;
    }

    const updatedDocSnapshot = await getDoc(docRef);
    const result = updatedDocSnapshot.data() as ReturnUpdateFirebaseNotes;

    return result.data.reverse();
}

export default db;