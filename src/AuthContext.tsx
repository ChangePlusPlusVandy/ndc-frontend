import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  confirmPasswordReset,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useContext, useState, useEffect, createContext } from "react";
import auth from "./firebase";
import type { UserCredential, User } from "firebase/auth";

interface AuthContextData {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    isStaff: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => User | null;
  isStaff: boolean | null;
  forgotPassword: (email: string) => Promise<void>;
  confirmReset: (code: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStaff, setIsStaff] = useState<boolean | null>(null);

  async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);

    //TODO: HANDLE LOGIN
  }

  async function registerUser(name: string, email: string, password: string, isStaff: boolean) {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        void updateProfile(userCredential.user, {
          displayName: name,
        });
      },
    ).then(() => {
      isStaff ? createMongoStaff(name, email) : createMongoPartner(name, email)
    })
  };

  const createMongoStaff = async (name: string, email: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
        },
        body: JSON.stringify({
          firstName: name,
          lastName: name,
          email: email,
          phoneNumber: "123",
          firebaseUID: currentUser?.uid
        })
      }
      const res = await fetch("/api/staff/", requestOptions);
      const staffUser = await res.json()
      setIsStaff(true);
      console.log("NEW STAFF, ", staffUser);
    } catch (err) {
      console.error(err);
    }
  }
  const createMongoPartner = async (name: string, email: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
        },
        body: JSON.stringify({
          firstName: name,
          lastName: name,
          email: email,
          phoneNumber: "123",
          location: "ld",
          address: "slkdjf",
          numOrdersTotal: 1,
          numOrdersYTD: 1,
          numOrdersMonth: 1,
          type: "DFD",
          firebaseUID: currentUser?.uid
        })
      }
      const res = await fetch("/api/partner/", requestOptions);
      const partnerUser = await res.json()
      setIsStaff(false);
      console.log("NEW Partner, ", partnerUser)
    } catch (err) {
      console.error(err);
    }
  }

  async function logout(): Promise<void> {
    return await signOut(auth);
    setIsStaff(null)
  }

  function getUser(): User | null {
    return currentUser;
  }

  async function forgotPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(auth, email);
  }

  async function confirmReset(code: string, password: string): Promise<void> {
    return await confirmPasswordReset(auth, code, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const setToken = async () => {
    const userToken = await currentUser?.getIdToken();
    if (userToken) {
      window.localStorage.setItem("auth", userToken);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setToken()
      console.log("SAVED TOKEN ", window.localStorage.getItem("auth"))
    } else {
      window.localStorage.removeItem("auth");
    }
  }, [currentUser])


  const value = {
    currentUser,
    login,
    registerUser,
    logout,
    getUser,
    isStaff,
    forgotPassword,
    confirmReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
