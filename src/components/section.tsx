export function Section({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="py-10 sm:py-14">
      {children}
    </section>
  );
}

export function SectionLabel({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="font-mono text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-6 flex items-center gap-3"
    >
      <span className="shrink-0 flex items-center gap-2">{children}</span>
      <span className="flex-1 border-t border-[var(--border)]" />
    </h2>
  );
}
