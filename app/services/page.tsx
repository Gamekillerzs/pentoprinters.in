const services = [
  {
    title: "Brochures & Magazines",
    text: "High-quality multi-page printing for your business literature.",
    accent: "border-sky-500"
  },
  {
    title: "Wedding Cards",
    text: "Elegant, premium designs for your special day.",
    accent: "border-pink-500"
  },
  {
    title: "Custom Boxes & Bags",
    text: "Packaging solutions with custom boxes and carry bags.",
    accent: "border-yellow-400"
  },
  {
    title: "Business Cards",
    text: "Premium matte, gloss, and textured visiting cards.",
    accent: "border-slate-700"
  },
  {
    title: "Canvas & Frames",
    text: "Canvas prints and photo frames to capture memories.",
    accent: "border-violet-500"
  },
  {
    title: "Posters",
    text: "Large-format poster printing for events and promotions.",
    accent: "border-rose-500"
  },
  {
    title: "Paper Trading",
    text: "Bulk paper trading and premium stationery supplies.",
    accent: "border-emerald-500"
  },
  {
    title: "Envelopes",
    text: "Custom printed envelopes in all standard sizes.",
    accent: "border-indigo-500"
  }
];

export default function ServicesPage() {
  return (
    <section className="space-y-6">
      <div className="reveal">
        <h1 className="text-4xl font-bold text-slate-900">Services</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          These are the print and packaging services we provide.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <article
            key={service.title}
            className={`${index > 3 ? "reveal-delay" : "reveal"} soft-card border-t-4 ${service.accent} p-6`}
          >
            <h2 className="text-2xl font-semibold text-slate-900">{service.title}</h2>
            <p className="mt-3 text-slate-600">{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}