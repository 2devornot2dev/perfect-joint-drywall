import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/misc/reveal";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-primary">
      {/* Background image: slow settle-in zoom */}
      <Reveal
        trigger="mount"
        scale={1.08}
        y={0}
        duration={1.6}
        className="absolute bottom-0 right-0 top-0 w-full lg:w-4/5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-test.jpeg"
          alt="Professional drywall installation"
          className="h-full w-full object-cover"
        />
      </Reveal>

      {/* Main hero content */}
      <div className="relative z-10 flex flex-1 items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center">
          {/* Floating card slides in from the left */}
          <Reveal
            trigger="mount"
            x={-40}
            y={0}
            delay={0.15}
            duration={0.9}
            className="w-full max-w-[36rem] rounded-[2rem] bg-white/80 p-8 shadow-2xl sm:p-12"
          >
            <Reveal trigger="mount" as="h1" y={16} delay={0.35} duration={0.7}>
              <span className="block text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-[3.4rem]">
                Professional<br />
                Drywall, Flawless<br />
                Finishes
              </span>
            </Reveal>

            <Reveal trigger="mount" as="p" y={16} delay={0.5} duration={0.7} className="mt-5 text-lg leading-relaxed text-gray-600 sm:text-xl">
              From installations to repair, our expert team transforms your spaces with precision and care.
            </Reveal>

            <Reveal trigger="mount" y={16} delay={0.65} duration={0.7} className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get A Free Quote
              </a>
            </Reveal>

            <Reveal
              trigger="mount"
              y={12}
              delay={0.8}
              duration={0.7}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-800"
            >
              <ShieldCheck className="h-5 w-5 fill-primary text-white" />
              <span>Licensed &amp; Insured | Satisfaction Guaranteed</span>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}