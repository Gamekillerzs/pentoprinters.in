"use client";

import { useEffect, useState } from "react";
import type { OrderStatus, PrintOrder } from "@/lib/orderStore";

const statuses: { label: string; value: OrderStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Declined", value: "declined" },
  { label: "Under Printing", value: "under-printing" },
  { label: "Printed", value: "printed" }
];

export default function AdminPanelPage() {
  const [orders, setOrders] = useState<PrintOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Could not load orders");
      }
      const data = (await res.json()) as { orders: PrintOrder[] };
      setOrders(data.orders);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId: string, status: OrderStatus) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        throw new Error("Status update failed");
      }

      setOrders((current) =>
        current.map((order) => (order.id === orderId ? { ...order, status } : order))
      );
    } catch {
      setError("Failed to update status.");
    }
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Admin Panel</h1>
        <p className="mt-2 text-slate-600">Manage statuses and download uploaded files.</p>
      </div>

      {error ? <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p> : null}

      <div className="soft-card overflow-x-auto p-4">
        {loading ? (
          <p className="text-slate-600">Loading orders...</p>
        ) : (
          <table className="w-full min-w-[1120px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="px-3 py-2">Order ID</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Service</th>
                <th className="px-3 py-2">Mode</th>
                <th className="px-3 py-2">Paper Quality</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Size</th>
                <th className="px-3 py-2">Document</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Update</th>
                <th className="px-3 py-2">File</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 text-sm text-slate-700">
                  <td className="px-3 py-3 font-semibold">{order.id}</td>
                  <td className="px-3 py-3">{order.customerName}</td>
                  <td className="px-3 py-3">{order.serviceName}</td>
                  <td className="px-3 py-3">{order.printMode}</td>
                  <td className="px-3 py-3">{order.paperQuality}</td>
                  <td className="px-3 py-3">{order.quantity}</td>
                  <td className="px-3 py-3">{order.size}</td>
                  <td className="px-3 py-3">{order.documentName}</td>
                  <td className="px-3 py-3 capitalize">{order.status.replace("-", " ")}</td>
                  <td className="px-3 py-3">
                    <select
                      value={order.status}
                      onChange={(event) => void updateStatus(order.id, event.target.value as OrderStatus)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    {order.storedFileName ? (
                      <a
                        href={`/api/orders/${order.id}/download`}
                        className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">No file</span>
                    )}
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