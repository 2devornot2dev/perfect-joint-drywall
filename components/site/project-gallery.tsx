import { projects } from "@/lib/data";
import { Reveal } from "@/components/misc/reveal";

export default function ProjectGallery() {
  return (
    <section id="work" className="bg-primary/10 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            y={16}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary"
          >
            <span className="h-px w-8 bg-primary" />
            Recent Work
            <span className="h-px w-8 bg-primary" />
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="text-4xl font-bold leading-tight tracking-tight text-stone-900 lg:text-5xl"
          >
            Projects we are proud of
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              as="li"
              y={32}
              delay={(i % 2) * 0.12}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden rounded-2xl shadow-lg">
                {/* Settle-in zoom lives on the wrapper; hover zoom stays on the img */}
                <Reveal y={0} scale={1.15} duration={1.4} className="h-72 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Reveal>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />

                <Reveal
                  y={12}
                  delay={0.35}
                  duration={0.7}
                  className="absolute bottom-0 left-0 right-0 p-6"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    {project.title}
                  </h3>
                </Reveal>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}