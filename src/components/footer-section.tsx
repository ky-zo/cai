import { CopyEmail } from "@/components/copy-email";

export function FooterSection() {
  return (
    <footer className="py-8 mt-4">
      <p className="font-mono text-xs text-[var(--muted)] flex flex-wrap items-center gap-1.5">
        <CopyEmail
          email="ai@kyzo.io"
          className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
        />
        <span>&bull;</span>
        <a
          href="https://x.com/ky__zo"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
        >
          @ky__zo
        </a>
        <span>&bull;</span>
        <a
          href="/ai"
          className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
        >
          cal.com
        </a>
      </p>
    </footer>
  );
}
