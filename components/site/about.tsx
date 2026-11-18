import { CheckCircle2, Award } from "lucide-react";
import { Reveal } from "@/components/misc/reveal";

const features = [
  "Free, no-obligation estimates",
  "Honest, itemized pricing",
  "Clean and respectful crew",
  "Workmanship guaranteed",
];

export default function About() {
  return (
    <section className="overflow-x-clip bg-primary/10 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text column */}
          <div>
            <Reveal
              x={-24}
              y={0}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary"
            >
              <span className="h-px w-8 bg-primary" />
              Who We Are
            </Reveal>

            <Reveal
              as="h2"
              delay={0.1}
              className="text-4xl font-bold leading-tight tracking-tight text-stone-900 lg:text-5xl"
            >
              A crew that treats every wall like it is in our own home.
            </Reveal>

            <Reveal
              as="p"
              delay={0.2}
              className="mt-6 text-lg leading-relaxed text-stone-600"
            >
              Perfect Joint Drywall was founded on a simple principle: do great
              work, show up on time, and stand behind every joint. For over 15
              years we have been the drywall and carpentry team that
              homeowners, builders, and contractors call when the finish has to
              be right the first time.
            </Reveal>

            <Reveal
              as="p"
              delay={0.3}
              className="mt-4 text-lg leading-relaxed text-stone-600"
            >
              From a single ceiling patch to a full house hang-and-finish, no
              job is too big or too small. We bring the same care, precision,
              and clean-site standard to every project.
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((item, i) => (
                <Reveal
                  key={item}
                  as="li"
                  y={12}
                  delay={0.35 + i * 0.08}
                  duration={0.6}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-base font-medium text-stone-700">
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Image column */}
          <div className="relative">
            <Reveal x={48} y={0} duration={1}>
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/5493675/pexels-photo-5493675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Craftsman measuring drywall with precision"
                  className="h-[500px] w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Badge: pops in after the image lands */}
            <Reveal
              scale={0.85}
              y={16}
              delay={0.5}
              duration={0.7}
              className="absolute -bottom-6 -left-6 hidden rounded-xl bg-primary p-6 shadow-xl sm:block"
            >
              <div className="flex items-center gap-4">
                <Award className="h-10 w-10 text-primary-foreground" />
                <div>
                  <div className="text-2xl font-bold text-primary-foreground">
                    Quality First
                  </div>
                  <div className="text-sm font-medium text-primary-foreground/80">
                    No shortcuts, no callbacks
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}