"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "customer" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = (await res.json()) as { role: Role };

      if (data.role === "admin") {
        router.push("/admin/action-centre");
      } else {
        router.push("/customer/profile");
      }
      router.refresh();
    } catch {
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass-card reveal mx-auto max-w-xl p-8 sm:p-10">
      <h1 className="text-3xl font-bold text-slate-900">Login</h1>
      <p className="mt-3 text-slate-600">
        Customer login opens your profile and previous orders.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {error ? <p className="mt-4 rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p> : null}

      <p className="mt-5 text-sm text-slate-600">
        New customer?{" "}
        <Link href="/signup" className="font-semibold text-cyan-700 hover:text-cyan-800">
          Create an account
        </Link>
      </p>
    </section>
  );
}