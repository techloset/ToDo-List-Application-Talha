"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./config";

const AuthUserContext = createContext({
  authUser: null,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);

  const clear = () => {
    setAuthUser(null);
  };
  
  const authStateChanged = async (user) => {
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
    
    // console.log("authuserrrr ", authUser);
  };

  const signOut = () => {
    authSignOut(auth).then(() => clear());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    setAuthUser,
    signOut,
  };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
