import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { auth } from "./firebaseConfig";

const handleAddNote = async (title, noteText, emoji, image) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı Oturumu Bulunamadı");
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            userId: user.uid,
            title: title,
            content: noteText,
            emoji: emoji,
            image: image,
            date: new Date().toISOString(),
        })
    } catch (error) {
        throw error;
    }
}

const handleGetNotes = async () => {
    const user = auth.currentUser
    if (!user) throw new Error("Kullanıcı Oturumu Bulunamadı");
    try {
        const notesRef = collection(db, "notes");
        const q = query(notesRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const notes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return notes
    } catch (error) {
        throw error;
    }
}

const handleDeleteNote = async (noteId) => {
    try {
        await deleteDoc(doc(db, "notes", noteId));
    } catch (error) {
        throw error;
    }
}

export {handleAddNote, handleGetNotes, handleDeleteNote}