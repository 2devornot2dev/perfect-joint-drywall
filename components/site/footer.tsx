import { navLinks } from "@/lib/data";
import { Reveal } from "@/components/misc/reveal";

export default function Footer() {
  return (
    <footer className="bg-stone-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo + name */}
          <Reveal
            margin="0px"
            y={16}
            duration={0.7}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/new-logo-no-bg-no-text.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white">Perfect Joint</span>
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                Drywall &amp; Carpentry
              </span>
            </div>
          </Reveal>

          {/* Nav links */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {navLinks.map((link, i) => (
              <Reveal
                key={link.href}
                as="span"
                margin="0px"
                y={12}
                delay={0.1 + i * 0.06}
                duration={0.6}
              >
                <a
                  href={link.href}
                  className="text-sm font-medium text-stone-400 transition-colors hover:text-primary focus-visible:text-primary"
                >
                  {link.label}
                </a>
              </Reveal>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-stone-800 pt-6 text-center">
          <Reveal
            as="p"
            margin="0px"
            y={0}
            delay={0.3}
            duration={0.8}
            className="text-sm text-stone-500"
          >
            &copy; {new Date().getFullYear()} Perfect Joint Drywall. All rights
            reserved.
          </Reveal>
        </div>
      </div>
    </footer>
  );
}