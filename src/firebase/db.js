import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { auth } from "./firebaseConfig";

const handleAddNote = async (title, noteText, emoji, image) => {
    const user = auth.currentUser;
    if(!user) throw new Error("Kullanıcı Oturumu Bulunamadı");
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

export default handleAddNote