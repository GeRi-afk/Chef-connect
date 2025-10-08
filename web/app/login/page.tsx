"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { emailSignInOrCreate, signInWithGoogle } from "@/lib/auth";

type Role = "business" | "chef";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("business");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function onEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      await emailSignInOrCreate(email, pw, role);
      router.push("/dashboard");
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setErr(null); setLoading(true);
    try {
      await signInWithGoogle(role);
      router.push("/dashboard");
    } catch (e: any) {
      setErr(e?.message ?? "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto">
        <Card className="rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Welcome</h1>
              <p className="text-sm text-muted-foreground">
                Sign in or create an account to continue.
              </p>
            </div>

            {/* role toggle */}
            <div className="flex gap-2">
              <Button variant={role === "business" ? "default" : "outline"} className="flex-1"
                onClick={() => setRole("business")}>
                I’m a Business
              </Button>
              <Button variant={role === "chef" ? "default" : "outline"} className="flex-1"
                onClick={() => setRole("chef")}>
                I’m a Chef
              </Button>
            </div>

            <form onSubmit={onEmailSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Email</label>
                <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm">Password</label>
                <Input type="password" value={pw} onChange={e=>setPw(e.target.value)} required />
              </div>
              {err && <p className="text-sm text-red-600">{err}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait…" : "Continue with Email"}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <p className="text-xs text-muted-foreground text-center -mt-7 bg-background w-10 mx-auto">or</p>
            </div>

            <Button variant="outline" className="w-full" onClick={onGoogle} disabled={loading}>
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
