"use client";

import { auth, db, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  fetchSignInMethodsForEmail,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

type Role = "business" | "chef";

/** Google Sign-in */
export async function signInWithGoogle(role: Role): Promise<User> {
  const res = await signInWithPopup(auth, googleProvider);
  await upsertUser(res.user, role);
  return res.user;
}

/** Email + password: create if missing, otherwise sign in. */
export async function emailSignInOrCreate(
  email: string,
  password: string,
  role: Role
): Promise<User> {
  // See how this email is registered (if at all)
  const methods = await fetchSignInMethodsForEmail(auth, email);

  if (methods.length === 0) {
    // No account -> create one
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res.user.displayName) {
      await updateProfile(res.user, { displayName: email.split("@")[0] });
    }
    await upsertUser(res.user, role);
    return res.user;
  }

  if (methods.includes("password")) {
    // Normal email/password -> sign in
    const res = await signInWithEmailAndPassword(auth, email, password);
    await upsertUser(res.user, role);
    return res.user;
  }

  if (methods.includes("google.com")) {
    // Registered via Google only
    throw new Error(
      "This email is registered with Google Sign-In. Please use 'Continue with Google'."
    );
  }

  // Fallback (rare)
  const res = await signInWithEmailAndPassword(auth, email, password);
  await upsertUser(res.user, role);
  return res.user;
}

/** Sign out */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/** Create/update user doc */
async function upsertUser(user: User, role: Role): Promise<void> {
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
