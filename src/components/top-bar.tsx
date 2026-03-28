export function TopBar() {
  return (
    <header className="max-w-3xl mx-auto w-full pt-5 pb-4">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider uppercase text-[var(--muted)]">
        <span className="font-semibold text-[var(--foreground)]">
          Agentic Engineer
        </span>
        <span className="hidden sm:block">
          Fractional AI · Product Co-founder
        </span>
        <span className="flex items-center gap-2">
          <span
            className="inline-block size-1.5 rounded-full animate-[pulse-dot_4s_ease-in-out_infinite]"
            style={{
              backgroundColor: "oklch(0.62 0.17 145)",
              boxShadow: "0 0 6px oklch(0.62 0.17 145 / 0.4)",
            }}
          />
          2 slots open
        </span>
      </div>
      <div className="mt-4 border-t border-dotted border-[var(--border)]" />
    </header>
  );
}
