"use client";

import { useState } from "react";
import type { PrintOrder } from "@/lib/orderStore";

const badgeClass: Record<PrintOrder["status"], string> = {
  pending: "bg-slate-200 text-slate-700",
  accepted: "bg-emerald-100 text-emerald-700",
  declined: "bg-rose-100 text-rose-700",
  "under-printing": "bg-amber-100 text-amber-700",
  printed: "bg-cyan-100 text-cyan-700"
};

export default function CustomerOrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<PrintOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function trackOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId.trim())}`, {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Order not found");
      }

      const data = (await res.json()) as { order: PrintOrder };
      setOrder(data.order);
    } catch {
      setError("Order not found. Please check your order ID and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Track Order Status</h1>
        <p className="mt-2 text-slate-600">Enter your Order ID to view the latest status updated by admin.</p>
      </div>

      <form onSubmit={trackOrder} className="soft-card max-w-xl space-y-4 p-5">
        <div>
          <label htmlFor="orderId" className="mb-2 block text-sm font-semibold text-slate-700">
            Order ID
          </label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            placeholder="Example: ORD-1003"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-slate-900 px-6 py-2.5 font-semibold text-white transition hover:bg-slate-700"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </form>

      {error ? <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p> : null}

      {order ? (
        <div className="soft-card max-w-3xl p-5">
          <p className="text-sm text-slate-500">Order ID</p>
          <p className="text-lg font-semibold text-slate-900">{order.id}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Service</p>
              <p className="font-medium text-slate-800">{order.serviceName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Document</p>
              <p className="font-medium text-slate-800">{order.documentName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Mode</p>
              <p className="font-medium text-slate-800">{order.printMode}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Paper Quality</p>
              <p className="font-medium text-slate-800">{order.paperQuality}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Quantity</p>
              <p className="font-medium text-slate-800">{order.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Size</p>
              <p className="font-medium text-slate-800">{order.size}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Submitted</p>
              <p className="font-medium text-slate-800">{new Date(order.submittedAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeClass[order.status]}`}>
                {order.status.replace("-", " ")}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}