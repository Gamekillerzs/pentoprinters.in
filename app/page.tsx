import Link from "next/link";

const highlights = [
  { title: "24h Turnaround", text: "Quick processing for urgent print jobs." },
  { title: "Premium Finish", text: "Sharp output on high-grade paper and stock." },
  { title: "Doorstep Delivery", text: "Scheduled delivery for homes and offices." }
];

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="glass-card reveal relative overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
        <p className="mb-3 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
          Modern Print Platform
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          From Pen to Printers, your documents go from draft to delivered.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Upload files, choose finishing options, and track every order with a smooth,
          modern experience built for speed.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/upload"
            className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Start Upload
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Explore Pricing
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item, index) => (
          <article
            key={item.title}
            className={`${index > 0 ? "reveal-delay" : "reveal"} soft-card p-6`}
          >
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
