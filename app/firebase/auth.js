
import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./config";

//created a context
const AuthUserContext = createContext({
  authUser: null,
  // isLoading: false, 
});

export default function useFirebaseAuth() {

  const [authUser, setAuthUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const clear = () => {
    setAuthUser(null);
    // setIsLoading(false);
  };

  const authStateChanged = async (user) => {
   
    // setIsLoading(true);

    if (!user) {
      clear();
      return;
    }
    console.log("auth user file" ,user.displayName);
    // if user sign in then update the states
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
   
    // setIsLoading(false);
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
    // isLoading,
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
