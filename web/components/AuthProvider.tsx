"use client";
import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!signedIn) {
    return (
      <div className="p-6">
        Please <Link href="/auth">sign in</Link> to continue.
      </div>
    );
  }
  return <>{children}</>;
}
