"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/data";
import { Reveal } from "@/components/misc/reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // correct state if the page loads (or refreshes) mid-scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <motion.header
      initial={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: EASE }}
      // Not transition-all: it would fight Motion's transform animation
      className={`fixed top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white"
      }`}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[padding] duration-300 lg:px-8 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <a href="#" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/new-logo-no-bg-no-text.png"
            alt=""
            className={`object-contain transition-[width,height] duration-300 ${
              scrolled ? "size-10" : "size-12"
            }`}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Perfect Joint
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              Drywall &amp; Carpentry
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link, i) => (
            <Reveal
              key={link.href}
              as="span"
              trigger="mount"
              y={-12}
              delay={0.3 + i * 0.07}
              duration={0.5}
            >
              <a
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus-visible:text-gray-900"
              >
                {link.label}
              </a>
            </Reveal>
          ))}

          <Reveal
            trigger="mount"
            y={-12}
            delay={0.3 + navLinks.length * 0.07}
            duration={0.5}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 p-2 text-gray-900 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            className="overflow-hidden border-t border-gray-100 bg-white shadow-xl lg:hidden"
          >
            <div className="flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto px-6 pb-6 pt-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.05, ease: EASE }}
                  className="py-2.5 text-base font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.08 + navLinks.length * 0.05,
                  ease: EASE,
                }}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}