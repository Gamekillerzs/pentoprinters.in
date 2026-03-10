const tentativePricing = [
  {
    service: "Pamphlets (Letter Size 8.5x11)",
    details: "Single-side and both-side options on different GSM papers.",
    sample: "From INR 849 / 1000 (single side)",
    range: "Approx INR 849 to 19,399 + 18% GST"
  },
  {
    service: "Letter Heads (A4)",
    details: "Single-side printing with not-required, pad, and pocket binding variants.",
    sample: "From INR 859 / 1000",
    range: "Approx INR 859 to 13,199 + 18% GST"
  },
  {
    service: "Stickers (7x9.5)",
    details: "Without cut, straight cut, and round cut with or without lamination.",
    sample: "From INR 1,749 / 1000 sheets",
    range: "Approx INR 1,749 to 2,349 + 18% GST"
  },
  {
    service: "Envelopes",
    details: "Multiple sizes and paper types (70 GSM, 90 GSM, 100 GSM, art paper variants).",
    sample: "From INR 1,129 / 1000 (5x7)",
    range: "Approx INR 1,129 to 18,509 + 18% GST"
  },
  {
    service: "Files / Folders",
    details: "Outer-only and outer+inner multicolor printing, with pocket and spot UV options.",
    sample: "From INR 6,950 / 1000",
    range: "Approx INR 6,950 to 20,250 + 18% GST"
  }
];

export default function PricingPage() {
  return (
    <section className="space-y-6">
      <div className="reveal">
        <h1 className="text-4xl font-bold text-slate-900">Explore Pricing</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Tentative prices based on your uploaded rate lists (Stickers, Envelopes, Letter Heads,
          Files, and Pamphlets).
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Note: Final quote may vary by artwork, finishing, quantity breakpoints, and delivery. GST extra.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tentativePricing.map((item, index) => (
          <article key={item.service} className={`${index > 1 ? "reveal-delay" : "reveal"} soft-card p-6`}>
            <h2 className="text-2xl font-semibold text-slate-900">{item.service}</h2>
            <p className="mt-2 text-slate-600">{item.details}</p>
            <p className="mt-4 text-lg font-bold text-cyan-700">{item.sample}</p>
            <p className="mt-2 text-sm text-slate-500">{item.range}</p>
          </article>
        ))}
      </div>
    </section>
  );
}