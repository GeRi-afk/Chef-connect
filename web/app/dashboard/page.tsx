"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function BusinessDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return router.replace("/login?role=business");
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.exists() ? snap.data()?.role : "business";
      if (role !== "business") return router.replace("/dashboard/chef");
      setName(user.displayName ?? user.email ?? "There");
      setReady(true);
    });
    return () => unsub();
  }, [router]);

  if (!ready) return null;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">Restaurant/Caterer Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome, {name}.</p>
      {/* TODO: post a shift, manage bookings, messages, etc. */}
    </main>
  );
}
