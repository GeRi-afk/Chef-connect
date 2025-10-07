"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full z-50">
        <div className="text-2xl font-bold text-blue-600">Chef Connect</div>
        <div className="flex gap-6">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/login?role=business" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            For Restaurants
          </a>
          <a href="/login?role=chef" className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100">
            I’m a Chef
          </a>
          <a href="/login" className="hover:text-blue-600 font-semibold">Login</a>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center text-center h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/chef-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Connecting Chefs & Restaurants
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-white max-w-xl z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Skip the agencies. Build trust through reviews & real work history.
        </motion.p>
        <motion.div
          className="mt-8 flex gap-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a href="#choose-role" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started
          </a>
          <a href="/about" className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100">
            Learn More
          </a>
        </motion.div>
      </section>

      {/* Choose your path */}
      <section id="choose-role" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Choose your path</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <RoleCard
              title="For Restaurants & Caterers"
              bulletA="Find vetted chefs fast"
              bulletB="Book by shift or long-term"
              bulletC="Ratings & verified work history"
              href="/for-business"
              badge="Hire talent"
            />
            <RoleCard
              title="For Chefs"
              bulletA="Discover paid gigs near you"
              bulletB="Build reputation with reviews"
              bulletC="Get paid reliably"
              href="/for-chefs"
              badge="Find gigs"
            />
          </div>
        </div>
      </section>

      {/* Features (kept brief) */}
      <section className="py-16 px-6 bg-gray-50 border-t">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">Why Chef Connect?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="Direct Connection" desc="Skip agency fees and connect directly." />
            <FeatureCard title="Proof of Work" desc="Verified reviews & history build trust." />
            <FeatureCard title="Real-Time" desc="Live shifts and availability in one place." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to join the future of hospitality?</h3>
        <a href="/login" className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold">
          Join Now
        </a>
      </section>
    </main>
  );
}

function RoleCard({
  title, bulletA, bulletB, bulletC, href, badge,
}: {
  title: string; bulletA: string; bulletB: string; bulletC: string; href: string; badge: string;
}) {
  return (
    <motion.a
      href={href}
      className="group block p-8 rounded-2xl border bg-white hover:shadow-xl transition shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
        {badge}
      </span>
      <h4 className="text-2xl font-semibold mt-4">{title}</h4>
      <ul className="mt-4 space-y-2 text-gray-600">
        <li>• {bulletA}</li>
        <li>• {bulletB}</li>
        <li>• {bulletC}</li>
      </ul>
      <div className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium">
        Explore <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </motion.a>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
