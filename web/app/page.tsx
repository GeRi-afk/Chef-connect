"use client";

import { useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<any>(null);

  const ping = async () => {
    const res = await fetch("/api/health", { cache: "no-store" });
    const json = await res.json();
    setData(json);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Chef Connect</h1>
      <p className="mt-2">Welcome. This is the public landing page.</p>

      <button className="mt-4 border px-3 py-2 rounded" onClick={ping}>
        Test API /api/health
      </button>

      {data && (
        <pre className="mt-4 p-3 border rounded bg-gray-50">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
