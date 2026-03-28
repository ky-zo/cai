import Image from "next/image";

export function TestimonialSection() {
  return (
    <div className="border border-[var(--border)] rounded-lg p-6 sm:p-8">
      <p className="text-sm leading-relaxed text-[var(--muted)] mb-6">
        &ldquo;This was the change we needed to move our company to be AI-first.
        After 2 weeks of work, our team (not only engineers) started using Claude
        Code on daily basis. We&rsquo;re now automating all the key company
        processes with AI.&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/heyreach-logo.jpg"
            alt="Nick Velkovski"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">Nick Velkovski</p>
            <p className="text-xs text-[var(--muted)]">
              HeyReach (+$10m ARR)
            </p>
          </div>
        </div>
        <Image
          src="/heyreach-icon.svg"
          alt="HeyReach"
          width={100}
          height={20}
          className="h-5 w-auto"
          unoptimized
        />
      </div>
    </div>
  );
}
