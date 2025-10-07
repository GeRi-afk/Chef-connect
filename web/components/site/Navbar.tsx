"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold text-blue-600">
          Chef Connect
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
            Login
          </Link>
        </div>

        <button aria-label="Menu" onClick={() => setOpen(v => !v)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-blue-600">Home</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-blue-600">About</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-white text-center hover:bg-blue-500">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
