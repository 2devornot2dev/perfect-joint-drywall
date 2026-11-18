import { steps } from "@/lib/data";
import { Reveal } from "@/components/misc/reveal";

export default function Process() {
  return (
    <section id="process" className="bg-stone-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            y={16}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary"
          >
            <span className="h-px w-8 bg-primary" />
            How It Works
            <span className="h-px w-8 bg-primary" />
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl"
          >
            A straightforward process
          </Reveal>

          <Reveal as="p" delay={0.2} className="mt-4 text-lg text-stone-300">
            No surprises, no mystery. Here is exactly what to expect when you
            work with us.
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              y={28}
              delay={index * 0.15}
              className="relative"
            >
              {/* Connector: draws in left to right, ends at the next circle */}
              {index < steps.length - 1 && (
                <Reveal
                  y={0}
                  scaleX={0}
                  delay={index * 0.15 + 0.35}
                  duration={0.9}
                  className="absolute left-14 top-7 hidden h-px w-[calc(100%-1.5rem)] origin-left bg-stone-700 lg:block"
                >
                  <span className="sr-only">then</span>
                </Reveal>
              )}

              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <step.icon className="h-6 w-6" strokeWidth={2} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-primary ring-2 ring-primary">
                  {index + 1}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}