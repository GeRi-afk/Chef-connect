"use client";

import { auth, db, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

type Role = "business" | "chef";

export async function signInWithGoogle(role: Role) {
  const res = await signInWithPopup(auth, googleProvider);
  await upsertUser(res.user, role);
  return res.user;
}

export async function emailSignInOrCreate(email: string, password: string, role: Role) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await upsertUser(res.user, role);
    return res.user;
  } catch (e: any) {
    if (e?.code === "auth/user-not-found") {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res.user.displayName) {
        await updateProfile(res.user, { displayName: email.split("@")[0] });
      }
      await upsertUser(res.user, role);
      return res.user;
    }
    throw e;
  }
}

export async function signOut() {
  await firebaseSignOut(auth);
}

async function upsertUser(user: User, role: Role) {
  const ref = doc(db, "users", user.uid);
  await setDoc(
    ref,
    {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      role,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}
