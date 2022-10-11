import { useEffect } from "react";
import { useState, ReactNode, createContext } from "react";

import { auth, firebase } from "../services/firebase"

type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
  singOut: () => Promise<void>
}

type AuthContextProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProps) {
  const [ user, setUser ] = useState<User>();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL } = user; 
        
        if (!displayName || !photoURL) {
          throw Error("Missing user information");
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => unsubcribe();
  }, []);

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { uid, displayName, photoURL } = result.user; 
      
      if (!displayName || !photoURL) {
        throw Error("Missing user information");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function singOut() {
    await auth.signOut();
    setUser(undefined)
  }

  return (
    <AuthContext.Provider value={{user, singInWithGoogle, singOut}}>
      {props.children}
    </AuthContext.Provider>
  );
}
