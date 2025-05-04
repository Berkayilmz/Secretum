import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user); // kullanıcı varsa true, yoksa false
      if (user) {
        console.log("Giriş başarılı ✅");
        console.log("UID:", user.uid);
        console.log("Email:", user.email);
        console.log("Display Name:", user.displayName);
      } else {
        console.log("Kullanıcı oturum açmamış ❌");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;