"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (!u) router.replace("/login");
      else {
        setName(u.displayName ?? u.email);
        setReady(true);
      }
    });
  }, [router]);

  if (!ready) return null;

  return (
    <div className="container py-16">
      <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
      <p className="text-muted-foreground mt-2">This is your dashboard.</p>
    </div>
  );
}
