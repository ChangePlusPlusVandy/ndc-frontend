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
          console.log("cred ,", userCredential);
          console.log("user ,", userCredential.user);
          console.log("uid ,", userCredential.user.uid);
          let checkPartner = await fetch(`/api/login?firebaseUid=${userCredential.user.uid}`, requestOptions);
          let data = await checkPartner.json();
          console.log("login ", data);
          // if (!data.error)
          //   setIsStaff(data.isStaff);

        } catch (err) {
          console.error(err)
        }
      }
    );
  }

  async function registerUser(name: string, email: string, password: string, isStaff: boolean = false) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Update the user profile
        return updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => userCredential); // Return userCredential for the next then
      })
      .then((userCredential) => {
        // Now userCredential is accessible here
        if (isStaff) {
          return createMongoStaff(name, email, userCredential.user.uid);
        } else {
          return createMongoPartner(name, email, userCredential.user.uid);
        }
      });
  }

  const createMongoStaff = async (name: string, email: string, uid: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
        },
        body: JSON.stringify({
          firstName: name,
          lastName: name,
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

  const createMongoPartner = async (name: string, email: string, uid: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
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
          firebaseUid: uid
        })
      }
      const res = await fetch("/api/partner/", requestOptions);
      const partnerUser = await res.json()
      setIsStaff(false);
      console.log(partnerUser);

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
