import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

const handleSignup = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: username
        })
        return user;
    } catch (error) {
        throw error;
    }
}

const handleSignin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        throw error;
    }
}

const handleSignout = async () => {
    try {
        await signOut(auth);
        console.log("çıkış yapıldı!");
    } catch (error) {
        throw error;
    }
}


export {handleSignup, handleSignin, handleSignout}