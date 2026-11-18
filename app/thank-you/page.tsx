import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, PhoneCall, Ruler, Phone } from "lucide-react";

import { Reveal } from "@/components/misc/reveal";
import { AnimatedCheck } from "@/components/misc/animated-check";

export const metadata: Metadata = {
  title: "Thank You | Perfect Joint Drywall",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Query params are user-editable: take the first value, trim, cap the length.
// (React escapes the output, so this is about layout and spoofing, not XSS.)
function pick(value: string | string[] | undefined, max = 40) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim().slice(0, max) || null;
}

const nextSteps = [
  {
    icon: ClipboardCheck,
    title: "We review your request",
    text: "We read through your project details so we come prepared.",
  },
  {
    icon: PhoneCall,
    title: "We give you a call",
    text: "Expect to hear from us within 24 hours to talk through the job.",
  },
  {
    icon: Ruler,
    title: "Free, no-obligation quote",
    text: "Honest, itemized pricing with no pressure to commit.",
  },
];

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const firstName = pick(params.name)?.split(/\s+/)[0] ?? null;
  const projectType = pick(params.type, 60);

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-stone-950 px-4 py-28 sm:px-6">
      {/* Soft brand glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"
      />

      <Reveal
        trigger="mount"
        y={32}
        duration={0.9}
        className="relative w-full max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-2xl sm:p-12"
      >
        <div className="flex justify-center">
          <AnimatedCheck />
        </div>

        <Reveal
          trigger="mount"
          as="h1"
          y={16}
          delay={0.5}
          duration={0.7}
          className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-5xl"
        >
          {firstName ? `Thank you, ${firstName}!` : "Thank you!"}
        </Reveal>

        <Reveal
          trigger="mount"
          as="p"
          y={16}
          delay={0.6}
          duration={0.7}
          className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-stone-600"
        >
          Your request has been received. One of our team members will be in
          touch within 24 hours.
        </Reveal>

        {projectType && (
          <Reveal
            trigger="mount"
            as="p"
            y={12}
            delay={0.7}
            duration={0.6}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-sm font-medium text-stone-600"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Project
            </span>
            {projectType}
          </Reveal>
        )}

        {/* What happens next */}
        <div className="mt-10 border-t border-stone-200 pt-10 text-left">
          <Reveal
            trigger="mount"
            y={0}
            delay={0.8}
            duration={0.6}
            className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-primary"
          >
            What happens next
          </Reveal>

          <ol className="space-y-5">
            {nextSteps.map((step, i) => (
              <Reveal
                key={step.title}
                as="li"
                trigger="mount"
                y={16}
                delay={0.9 + i * 0.12}
                duration={0.6}
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-stone-900">{step.title}</div>
                  <p className="mt-0.5 text-sm leading-relaxed text-stone-600">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <Reveal
          trigger="mount"
          y={12}
          delay={1.3}
          duration={0.6}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <a
            href="tel:+16475142453"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-6 py-3.5 text-base font-semibold text-stone-800 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            (647) 514-2453
          </a>
        </Reveal>

        <p className="mt-6 text-xs text-stone-400">
          Urgent job? Give us a call and we&rsquo;ll get you sorted faster.
        </p>
      </Reveal>
    </main>
  );
}