"use client";

import { useState } from "react";

const services = [
  "Brochures & Magazines",
  "Wedding Cards",
  "Custom Boxes & Bags",
  "Business Cards",
  "Canvas & Frames",
  "Posters",
  "Paper Trading",
  "Envelopes"
];

const modes = ["Color", "Black & White"];
const paperQualities = ["Standard", "Premium", "Matte", "Gloss"];
const sizes = ["A4", "A5", "A3", "Letter", "Custom"];

export default function UploadPage() {
  const [customerName, setCustomerName] = useState("");
  const [serviceName, setServiceName] = useState(services[0]);
  const [printMode, setPrintMode] = useState(modes[0]);
  const [paperQuality, setPaperQuality] = useState(paperQualities[0]);
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Please choose a file to upload.");
      return;
    }

    if (quantity <= 0) {
      setMessage("Please enter a valid quantity.");
      return;
    }

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("serviceName", serviceName);
    formData.append("printMode", printMode);
    formData.append("paperQuality", paperQuality);
    formData.append("size", size);
    formData.append("quantity", String(quantity));
    formData.append("file", file);

    const res = await fetch("/api/orders", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      setMessage("Could not submit order. Please fill all fields correctly.");
      return;
    }

    const data = (await res.json()) as { order: { id: string } };
    setMessage(`Order created successfully. Your order ID is ${data.order.id}.`);
    setCustomerName("");
    setServiceName(services[0]);
    setPrintMode(modes[0]);
    setPaperQuality(paperQualities[0]);
    setSize(sizes[0]);
    setQuantity(1);
    setFile(null);
    const form = event.currentTarget;
    form.reset();
  }

  return (
    <section className="glass-card reveal mx-auto max-w-3xl p-8 sm:p-10">
      <h1 className="text-4xl font-bold text-slate-900">Upload Document</h1>
      <p className="mt-3 text-lg text-slate-600">
        Upload your file and submit an order. Admin can review and update status.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
            Customer Name
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="serviceName" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
            Service
          </label>
          <select
            id="serviceName"
            name="serviceName"
            value={serviceName}
            onChange={(event) => setServiceName(event.target.value)}
            className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="printMode" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
              Mode
            </label>
            <select
              id="printMode"
              name="printMode"
              value={printMode}
              onChange={(event) => setPrintMode(event.target.value)}
              className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
            >
              {modes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="paperQuality" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
              Paper Quality
            </label>
            <select
              id="paperQuality"
              name="paperQuality"
              value={paperQuality}
              onChange={(event) => setPaperQuality(event.target.value)}
              className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
            >
              {paperQualities.map((quality) => (
                <option key={quality} value={quality}>
                  {quality}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quantity" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="size" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
              Size
            </label>
            <select
              id="size"
              name="size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
            >
              {sizes.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="file" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
            Upload File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          Submit Order
        </button>
      </form>

      {message ? <p className="mt-4 rounded-xl bg-cyan-50 p-3 text-cyan-700">{message}</p> : null}
    </section>
  );
}