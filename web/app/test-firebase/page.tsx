"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // or "../firebase" if that's where yours is

type TestDoc = {
  message: string;
  createdAt: Timestamp;
};

// Strongly-typed converter (kills the `any`)
const testDocConverter: FirestoreDataConverter<TestDoc> = {
  toFirestore: (data: TestDoc) => data,
  fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions) =>
    snap.data(options) as TestDoc,
};

export default function TestFirebasePage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const addMessage = async () => {
    setBusy(true);
    try {
      await addDoc(
        collection(db, "testData").withConverter(testDocConverter),
        { message: "Hello from Chef-Connect!", createdAt: Timestamp.now() }
      );
      await fetchMessages();
    } finally {
      setBusy(false);
    }
  };

  const fetchMessages = async () => {
    setBusy(true);
    try {
      const snap = await getDocs(
        collection(db, "testData").withConverter(testDocConverter)
      );
      setMessages(snap.docs.map((d) => d.data().message ?? "—"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Firestore Connectivity Test</h1>
      <div className="mt-4 flex gap-2">
        <button className="border px-3 py-2 rounded" onClick={addMessage} disabled={busy}>
          Add Test Message
        </button>
        <button className="border px-3 py-2 rounded" onClick={fetchMessages} disabled={busy}>
          Fetch Messages
        </button>
      </div>

      <ul className="mt-4 space-y-1">
        {messages.map((m, i) => (
          <li key={i} className="border rounded p-2">{m}</li>
        ))}
      </ul>
    </main>
  );
}
