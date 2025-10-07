export default function ForBusiness() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">For Restaurants & Caterers</h1>
      <p className="mt-4 text-gray-700">
        Post shifts, book chefs fast, and build trusted relationships with verified talent.
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Card title="Post a Shift" desc="Create a request in minutes and reach vetted chefs." />
        <Card title="Compare Profiles" desc="Ratings, reviews, and verified work history." />
        <Card title="Manage Easily" desc="Messaging, confirmations, and payout tracking." />
      </div>

      <a href="/login" className="inline-block mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Get Started
      </a>
    </main>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
