import { Suspense } from "react";
import LoginClient from "./LoginClient";

// Avoid static export for this route (it reads search params)
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
