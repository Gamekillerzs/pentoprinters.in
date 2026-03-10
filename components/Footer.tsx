export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/50 bg-white/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-7 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>(c) {new Date().getFullYear()} Pen to Printers. Crafted for modern print workflows.</p>
        <p className="font-medium text-slate-500">Fast turnaround | Quality guaranteed</p>
      </div>
    </footer>
  );
}
