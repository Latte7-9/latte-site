export default function Footer() {
  return (
    <footer className="border-t border-[#e8e0d6] bg-cream py-6">
      <div className="container-narrow flex flex-col items-center gap-2 text-center">
        <p className="text-caption font-mono text-ink-muted">
          &copy; {new Date().getFullYear()} Latte
        </p>
        <p className="text-caption italic text-ink-muted/60">
          用代码煮一杯拿铁
        </p>
      </div>
    </footer>
  );
}
