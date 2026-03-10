export default function ContactPage() {
  return (
    <section className="space-y-6">
      <div className="glass-card reveal max-w-5xl p-8 sm:p-10">
        <h1 className="text-4xl font-bold text-slate-900">Contact</h1>
        <p className="mt-4 text-lg text-slate-600">
          Need a quote, bulk estimate, or custom print support? Our team is here to help.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="soft-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
            <a href="mailto:pentoprinters@gmail.com" className="mt-2 block text-base font-semibold text-cyan-700 hover:text-cyan-800">
              pentoprinters@gmail.com
            </a>
            <p className="mt-2 text-sm text-slate-600">Replies within business hours.</p>
          </article>

          <article className="soft-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
            <a href="tel:+919814741828" className="mt-2 block text-base font-semibold text-cyan-700 hover:text-cyan-800">
              +91 98147 41828
            </a>
            <p className="mt-2 text-sm text-slate-600">7:00 AM to 7:00 PM (every day)</p>
          </article>

          <article className="soft-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Business WhatsApp</p>
            <a href="https://wa.me/919855940345" className="mt-2 block text-base font-semibold text-cyan-700 hover:text-cyan-800">
              +91 98559 40345
            </a>
            <p className="mt-2 text-sm text-slate-600">Quick updates and order support.</p>
          </article>

          <article className="soft-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Office Address</p>
            <p className="mt-2 text-base font-semibold text-slate-800">
              Street 1a/1, Guru Nanak Nagar, Patiala
            </p>
            <p className="mt-2 text-sm text-slate-600">Open daily from 7:00 AM to 7:00 PM.</p>
          </article>
        </div>

        <div className="mt-6 soft-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bank Details</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <p><span className="font-semibold">Account Holder:</span> PARTAP TRADING COMPANY</p>
            <p><span className="font-semibold">Account Number:</span> 50200083144851</p>
            <p><span className="font-semibold">IFSC:</span> HDFC0000116</p>
            <p><span className="font-semibold">Branch:</span> PATIALA LEELA BHAWAN</p>
            <p><span className="font-semibold">Account Type:</span> CURRENT</p>
            <p><span className="font-semibold">VPA:</span> 9814741828@hdfcbank</p>
          </div>
        </div>
      </div>
    </section>
  );
}