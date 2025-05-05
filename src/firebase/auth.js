import { auth } from "./firebaseConfig";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    signOut, 
    updateEmail, 
    sendEmailVerification, 
    sendPasswordResetEmail, 
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";

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

const handleUpdateUser = async (displayName, email) => {
    const currentUser = auth.currentUser;
  
    if (!currentUser) throw new Error("Kullanıcı oturumu açık değil.");
  
    // DisplayName güncelle
    if (displayName && displayName !== currentUser.displayName) {
      await updateProfile(currentUser, { displayName });
    }
  
    // E-posta güncelle
    if (email && email !== currentUser.email) {
      await updateEmail(currentUser, email);
    }
  };

const handleVerification = async () => {
    const user = auth.currentUser;
    if(!user) throw new Error("Kullanıcı oturumu bulunamadı")
    try {
        await sendEmailVerification(user)
    } catch (error) {
        throw error;
    }
}

const handleUpdatePassword = async (email) => {
    try {
        sendPasswordResetEmail(auth, email)
    } catch (error) {
        throw error
    }
}

const handleDeleteUser = async (password) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı oturumu bulunamadı");

    const email = user.email; // ✅ e-postayı buradan al
    const credential = EmailAuthProvider.credential(email, password);

    try {
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        console.log("Kullanıcı silindi.");
    } catch (error) {
        console.error("Silme hatası:", error.message);
        throw error;
    }
};


export { handleSignup, handleSignin, handleSignout, handleUpdateUser, handleVerification, handleUpdatePassword, handleDeleteUser }