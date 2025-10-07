'use client';

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithGoogle, emailSignInOrCreate } from "@/lib/auth";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();

  // read role & error from the URL, e.g. /login?role=chef&error=...
  const role = useMemo<"business" | "chef">(() => {
    const r = sp.get("role");
    return r === "business" ? "business" : "chef";
  }, [sp]);
  const urlError = sp.get("error") || "";

  // local UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(urlError || null);

  async function afterLogin(nextRole: "business" | "chef") {
    router.push(nextRole === "business" ? "/dashboard/business" : "/dashboard/chef");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold">Welcome to Chef Connect</h1>
        <p className="mt-2 text-gray-600">
          You’re signing in as{" "}
          <span className="font-medium">
            {role === "business" ? "Restaurant/Caterer" : "Chef"}
          </span>
        </p>

        {error && (
          <div className="mt-4 bg-red-50 text-red-700 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <button
          onClick={async () => {
            setPending(true); setError(null);
            try {
              await signInWithGoogle(role);
              await afterLogin(role);
            } catch (e: any) {
              setError(e?.message || "Google sign-in failed");
            } finally {
              setPending(false);
            }
          }}
          className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          disabled={pending}
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true); setError(null);
            try {
              await emailSignInOrCreate(email, password, role);
              await afterLogin(role);
            } catch (e: any) {
              setError(e?.message || "Email sign-in failed");
            } finally {
              setPending(false);
            }
          }}
          className="space-y-3"
        >
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg border bg-gray-900 text-white hover:bg-black disabled:opacity-60"
            disabled={pending}
          >
            Continue with Email
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          You can change your role later in settings.
        </p>
      </div>
    </main>
  );
}
