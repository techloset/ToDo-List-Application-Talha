'use client'
import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./config";

//created a context
const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function useFirebaseAuth() {

  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    // user login or logout loading turn on
    // console.log(" user all the from firbasse/auth cnontext file",user);
    setIsLoading(true);

    if (!user) {
      clear();
      return;
    }
    // if user sign in then update the states
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
   
    setIsLoading(false);
  };

  const signOut = () => {
    authSignOut(auth).then(() => clear());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);
  console.log(authUser)

  return {
    authUser,
    isLoading,
    signOut,
    setAuthUser,
  };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
