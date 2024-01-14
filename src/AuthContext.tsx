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
  login: (email: string, password: string) => Promise<void>;
  registerUser: (
    firstName: string,
    lastName: string,
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
    return await signInWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        try {
          const token = await currentUser?.getIdToken();
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
          let checkPartner = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login?firebaseUid=${userCredential.user.uid}`, requestOptions);
          let data = await checkPartner.json();
          if (!data.error)
            setIsStaff(data.isStaff);
        } catch (err) {
          console.error(err)
        }
      }
    );
  }

  async function registerUser(firstName: string, lastName: string, email: string, password: string, isStaff: boolean = false) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Update the user profile
        return updateProfile(userCredential.user, {
          displayName: firstName + lastName,
        }).then(() => userCredential);
      })
      .then((userCredential) => {
        // Now userCredential is accessible here
        if (isStaff) {
          return createMongoStaff(firstName, lastName, email, userCredential.user.uid);
        } else {
          return createMongoPartner(firstName, lastName, email, userCredential.user.uid);
        }
      });
  }

  const createMongoStaff = async (firstName: string, lastName: string, email: string, uid: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: "123",
          firebaseUid: uid,
        })
      }
      const res = await fetch("/api/staff/", requestOptions);
      const staffUser = await res.json();
      setIsStaff(true);
    } catch (err) {
      console.error(err);
    }
  }

  const createMongoPartner = async (firstName: string, lastName: string, email: string, uid: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: "123",
          location: "ld",
          address: "slkdjf",
          numOrdersTotal: 1,
          numOrdersYTD: 1,
          numOrdersMonth: 1,
          type: "DFD",
          firebaseUid: uid
        })
      }
      const res = await fetch("/api/partner/", requestOptions);
      const partnerUser = await res.json()
      setIsStaff(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function logout(): Promise<void> {
    setIsStaff(null)
    return await signOut(auth);
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
