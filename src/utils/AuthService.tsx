import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebase } from "../fb-credentials";
import { doc, getFirestore, setDoc } from "firebase/firestore";

// Registrar usuario
export const registerUser = async (email: string, password: string) => {
  try {
    const auth = getAuth(firebase)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const auth = getAuth(firebase)
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const auth = getAuth(firebase)
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

export const writerNewData = async (data) => {
  try {
    const db = getFirestore(firebase);
    await setDoc(doc(db, "pi", "lse01"), data);
  } catch (error) {
    console.error("Error al escribir documento:", error);
  }
};
