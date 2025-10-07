export default function ForChefs() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">For Chefs</h1>
      <p className="mt-4 text-gray-700">
        Find great gigs, get reviews, and grow your income with reliable clients.
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Card title="Find Gigs" desc="Browse nearby shifts and book instantly." />
        <Card title="Build Reputation" desc="Collect reviews and showcase your best work." />
        <Card title="Get Paid" desc="Track completed shifts and payouts." />
      </div>

      <a href="/login" className="inline-block mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Start Now
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
