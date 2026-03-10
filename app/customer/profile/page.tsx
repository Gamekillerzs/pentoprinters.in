"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PrintOrder } from "@/lib/orderStore";

type UserInfo = {
  name: string;
  email: string;
  role: string;
};

const badgeClass: Record<PrintOrder["status"], string> = {
  pending: "bg-slate-200 text-slate-700",
  accepted: "bg-emerald-100 text-emerald-700",
  declined: "bg-rose-100 text-rose-700",
  "under-printing": "bg-amber-100 text-amber-700",
  printed: "bg-cyan-100 text-cyan-700"
};

export default function CustomerProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [orders, setOrders] = useState<PrintOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [meRes, ordersRes] = await Promise.all([
        fetch("/api/auth/me", { cache: "no-store" }),
        fetch("/api/orders/mine", { cache: "no-store" })
      ]);

      if (meRes.ok) {
        const meData = (await meRes.json()) as { user: UserInfo | null };
        setUser(meData.user);
      }

      if (ordersRes.ok) {
        const orderData = (await ordersRes.json()) as { orders: PrintOrder[] };
        setOrders(orderData.orders);
      }

      setLoading(false);
    }

    void loadData();
  }, []);

  return (
    <section className="space-y-6">
      <div className="glass-card p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Customer Profile</h1>
        <p className="mt-2 text-slate-600">View your profile and previous orders.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="soft-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{user?.name ?? "-"}</p>
          </div>
          <div className="soft-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{user?.email ?? "-"}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/upload" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
            Place New Order
          </Link>
          <Link href="/customer/orders" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400">
            Track by Order ID
          </Link>
        </div>
      </div>

      <div className="soft-card overflow-x-auto p-4">
        <h2 className="px-2 pb-3 text-xl font-semibold text-slate-900">Previous Orders</h2>
        {loading ? (
          <p className="px-2 text-slate-600">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="px-2 text-slate-600">No previous orders found for your account yet.</p>
        ) : (
          <table className="w-full min-w-[740px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="px-3 py-2">Order ID</th>
                <th className="px-3 py-2">Service</th>
                <th className="px-3 py-2">Document</th>
                <th className="px-3 py-2">Submitted</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 text-sm text-slate-700">
                  <td className="px-3 py-3 font-semibold">{order.id}</td>
                  <td className="px-3 py-3">{order.serviceName}</td>
                  <td className="px-3 py-3">{order.documentName}</td>
                  <td className="px-3 py-3">{new Date(order.submittedAt).toLocaleString()}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeClass[order.status]}`}>
                      {order.status.replace("-", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}