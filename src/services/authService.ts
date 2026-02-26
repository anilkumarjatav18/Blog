import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "./firebase";



export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  const cred = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(cred.user, {
    displayName: username,
  });

  return cred.user;
};


export const loginUser = async (
  email: string,
  password: string
) => {
  const cred = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return cred.user;
};

// ✅ logout
export const logoutUser = async () => {
  await signOut(auth);
};