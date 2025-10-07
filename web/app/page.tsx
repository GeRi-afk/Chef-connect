"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  { title: "Proof-of-work profiles", text: "Transparent reviews, shift history, verified skills." },
  { title: "Instant bookings", text: "Post a shift, accept an application, auto-confirm." },
  { title: "In-app messaging", text: "Keep everything in one place—no agency middlemen." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="container py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Hire great <span className="text-emerald-500">chefs</span> fast.
            </h1>
            <p className="text-muted-foreground text-lg">
              Chef-Connect links restaurants with vetted chefs using real shift reviews.
              No agency markup, no noise—just proof and speed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/for-business">I’m a Business</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/for-chefs">I’m a Chef</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Free while in beta.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/3] w-full rounded-2xl border bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-transparent p-4">
              <div className="h-full w-full rounded-xl border border-dashed grid place-items-center text-muted-foreground">
                App preview goes here (profiles/jobs)
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="rounded-2xl">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-muted-foreground">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-28">
        <div className="rounded-2xl border p-8 md:p-12 flex items-center justify-between gap-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-transparent">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold">Ready to try Chef-Connect?</h3>
            <p className="text-muted-foreground">Create a profile and get your first booking.</p>
          </div>
          <Button asChild size="lg">
            <Link href="/login">Get started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
