import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="glass-card reveal mx-auto max-w-2xl p-8 sm:p-10">
      <h1 className="text-3xl font-bold text-slate-900">Customer Sign Up</h1>
      <p className="mt-3 text-slate-600">
        Create your customer account to upload files, place print orders, and track status.
      </p>

      <form className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            placeholder="John"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            placeholder="Doe"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            placeholder="name@example.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            placeholder="+1 555 123 4567"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            placeholder="Create a password"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
            placeholder="Repeat your password"
          />
        </div>

        <button
          type="submit"
          className="sm:col-span-2 mt-2 w-full rounded-full bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          Create Customer Account
        </button>
      </form>

      <p className="mt-5 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-cyan-700 hover:text-cyan-800">
          Login
        </Link>
      </p>
    </section>
  );
}
