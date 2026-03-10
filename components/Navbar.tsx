import Link from "next/link";
import { cookies } from "next/headers";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/upload", label: "Upload" },
  { href: "/customer/orders", label: "Order Status" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const role = cookies().get("user_role")?.value;
  const userName = cookies().get("user_name")?.value ?? "Account";

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="leading-tight text-slate-900">
          <p className="text-xl font-bold tracking-tight">Pen to Printers</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">By Partap Trading Co.</p>
          <p className="text-[11px] text-slate-500">A Brand by Partap Trading Company</p>
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <ul className="flex flex-wrap gap-2 sm:gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {!role ? (
            <>
              <Link
                href="/signup"
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Login
              </Link>
            </>
          ) : (
            <details className="relative">
              <summary className="cursor-pointer list-none rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                {userName}
              </summary>
              <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {role === "customer" ? (
                  <>
                    <Link href="/customer/profile" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                      My Profile
                    </Link>
                    <Link href="/customer/orders" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                      Track Order
                    </Link>
                  </>
                ) : (
                  <Link href="/admin/action-centre" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Admin Panel
                  </Link>
                )}
                <a href="/api/auth/logout" className="block rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">
                  Logout
                </a>
              </div>
            </details>
          )}
        </div>
      </nav>
    </header>
  );
}