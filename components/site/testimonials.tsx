import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/misc/reveal";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-stone-100 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal
            y={16}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary"
          >
            <span className="h-px w-8 bg-primary" />
            Client Reviews
            <span className="h-px w-8 bg-primary" />
          </Reveal>

          <Reveal
            as="h2"
            delay={0.1}
            className="text-4xl font-bold leading-tight tracking-tight text-stone-900 lg:text-5xl"
          >
            Homeowners trust us with their walls
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => {
            const cardDelay = i * 0.12;

            return (
              <Reveal
                key={testimonial.name}
                as="li"
                y={32}
                delay={cardDelay}
                className="h-full"
              >
                <div className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                  <Quote aria-hidden className="h-10 w-10 text-primary/30" />

                  {/* Stars pop in one at a time after the card lands */}
                  <div
                    role="img"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                    className="mt-4 flex"
                  >
                    {Array.from({ length: testimonial.rating }).map((_, s) => (
                      <Reveal
                        key={s}
                        as="span"
                        y={0}
                        scale={0.3}
                        delay={cardDelay + 0.35 + s * 0.07}
                        duration={0.5}
                      >
                        <Star
                          aria-hidden
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      </Reveal>
                    ))}
                  </div>

                  <p className="mt-4 flex-1 text-base leading-relaxed text-stone-700">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="mt-6 border-t border-stone-200 pt-4">
                    <div className="font-bold text-stone-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-stone-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}