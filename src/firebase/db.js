import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, getDoc, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import { encryptText, decryptText } from "../utils/encryption";

const handleAddNote = async (title, noteText, emoji, image, isPrivate) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı Oturumu Bulunamadı");

    const encryptedTitle = await encryptText(title);
    const encryptedNoteText = await encryptText(noteText);
    const encryptedImagePath = await encryptText(image);

    try {
        const userNotesRef = collection(db, "notes", user.uid, "userNotes");
        await addDoc(userNotesRef, {
            title: encryptedTitle,
            content: encryptedNoteText,
            emoji,
            image: encryptedImagePath,
            isPrivate,
            date: new Date().toISOString()
        })
    } catch (error) {
        throw error;
    }
}

const handleGetNotes = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı Oturumu Bulunamadı");

    try {
        const userNotesRef = collection(db, "notes", user.uid, "userNotes");
        const querySnapshot = await getDocs(userNotesRef);

        const notes = Promise.all(querySnapshot.docs.map(async doc => {
            const data = doc.data();

            const decryptedTitle = await decryptText(data.title);
            const decryptedContent = await decryptText(data.content);
            const decryptedImagePath = await decryptText(data.image);

            return {
                id: doc.id,
                ...data,
                title: decryptedTitle,
                content: decryptedContent,
                image: decryptedImagePath,
            }
        }));
        return notes;
    } catch (error) {
        throw error;
    }
}

const handleGetNotesByDate = async (dateString) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı Oturumu Bulunamadı");

    try {
        const userNotesRef = collection(db, "notes", user.uid, "userNotes");

        const start = new Date(`${dateString}T00:00:00.000Z`);
        const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

        const q = query(
            userNotesRef,
            where("date", ">=", start.toISOString()),
            where("date", "<", end.toISOString())
        );

        const snapshot = await getDocs(q);

        const notes = await Promise.all(
            snapshot.docs.map(async (doc) => {
                const data = doc.data();

                const decryptedTitle = await decryptText(data.title);
                const decryptedContent = await decryptText(data.content);
                const decryptedImagePath = await decryptText(data.image);

                return {
                    id: doc.id,
                    ...data,
                    title: decryptedTitle,
                    content: decryptedContent,
                    image: decryptedImagePath,
                }
            })
        )
        return notes;
    } catch (error) {
        throw error;
    }
};


const handleDeleteNote = async (noteId) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı Oturumu Bulunamadı");
    try {
        await deleteDoc(doc(db, "notes", user.uid, "userNotes", noteId));
    } catch (error) {
        throw error;
    }
}

const handleUpdateNote = async (docId, updatedNote) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı Oturumu Bulunamadı");
    try {
        const noteRef = doc(db, "notes", user.uid, "userNotes", docId);
    
        const decryptedTitle = await encryptText(updatedNote.title);
        const decryptedContent = await encryptText(updatedNote.content);
        const decryptedImage = await encryptText(updatedNote.image);

        await updateDoc(noteRef, {
            ...updatedNote,
            title: decryptedTitle,
            content: decryptedContent,
            image: decryptedImage,
        })

    } catch (error) {
        throw error;
    }
}

const handleGetUserNoteStats = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı oturumu bulunamadı");

    const notesRef = collection(db, "notes", user.uid, "userNotes");

    try {
        const q = query(notesRef, orderBy("date", "asc")); // en eski tarihten sırala
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return {
                totalCount: 0,
                lastNoteDate: null,
                longestStreak: 0,
            };
        }

        const notes = snapshot.docs.map(doc => new Date(doc.data().date).toISOString().split("T")[0]);

        // ✅ Toplam not sayısı
        const totalCount = snapshot.size;

        // ✅ Son notun tarihi (en son belgeye bak)
        const lastNoteDate = new Date(snapshot.docs[snapshot.docs.length - 1].data().date);

        // ✅ En uzun arka arkaya yazma serisi (streak)
        const uniqueDates = [...new Set(notes)].sort();
        let longestStreak = 0;
        let currentStreak = 1;

        for (let i = 1; i < uniqueDates.length; i++) {
            const prev = new Date(uniqueDates[i - 1]);
            const curr = new Date(uniqueDates[i]);
            const diff = (curr - prev) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                currentStreak++;
            } else {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
        }

        longestStreak = Math.max(longestStreak, currentStreak);

        return {
            totalCount,
            lastNoteDate,
            longestStreak,
        };

    } catch (error) {
        throw new Error("İstatistikler alınamadı: " + error.message);
    }
};



export { handleAddNote, handleGetNotes, handleDeleteNote, handleUpdateNote, handleGetNotesByDate, handleGetUserNoteStats }