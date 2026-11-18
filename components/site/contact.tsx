"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/misc/reveal";
import { sendContactEmail } from "@/lib/actions/send-contact-email";
import { projectTypeItems } from "@/lib/types/project-types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

const FALLBACK_ERROR =
  "Something went wrong. Please try again or call us at (647) 514-2453.";

export default function ContactSection() {
  const router = useRouter();
  const [projectType, setProjectType] = useState<string | null>(null);
  const [projectTypeError, setProjectTypeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    // Grab the form before any await (currentTarget is cleared after the handler returns)
    const form = e.currentTarget;

    // Make sure they selected a project type
    if (!projectType) {
      setProjectTypeError(true);
      return;
    }
    setProjectTypeError(false);
    setSubmitError(null);

    // Collect all form data in one place
    const formData = new FormData(form);
    const name = (formData.get("name") as string).trim();
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const details = formData.get("details") as string;
    const website = formData.get("website") as string; // honeypot
    const projectTypeLabel =
      projectTypeItems.find((item) => item.value === projectType)?.label ??
      projectType;

    setSubmitting(true);
    try {
      const result = await sendContactEmail({
        name,
        phone,
        email,
        projectType,
        details,
        website,
      });

      if (!result.success) {
        setSubmitError(result.error);
        setSubmitting(false);
        return;
      }

      // Only non-sensitive bits go in the URL: no phone, email or details
      const params = new URLSearchParams({ name, type: projectTypeLabel });
      router.push(`/thank-you?${params.toString()}`);
    } catch {
      setSubmitError(FALLBACK_ERROR);
      setSubmitting(false);
    }
    // No reset or setSubmitting(false) on success: we're navigating away
  };

  return (
    <section
      id="contact"
      className="overflow-x-clip bg-stone-950 py-20 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Contact Information */}
          <div className="flex flex-col justify-center">
            <Reveal
              as="h2"
              x={-24}
              y={0}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              Let&rsquo;s Discuss Your Project
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="mt-4 max-w-lg text-lg text-stone-400"
            >
              Get in touch with us today for a free, no-obligation quote. Our
              team is ready to help with any drywall needs.
            </Reveal>

            <ul className="mt-12 space-y-8">
              <Reveal as="li" y={20} delay={0.2}>
                <a
                  href="tel:+16475142453"
                  className="group flex items-center gap-5 transition-all hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-colors group-hover:bg-primary/90">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-stone-400">
                      Call Us
                    </div>
                    <div className="text-xl font-bold text-white">
                      (647) 514-2453
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal as="li" y={20} delay={0.3}>
                <a
                  href="mailto:info@perfectjointdrywall.com"
                  className="group flex items-center gap-5 transition-all hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-colors group-hover:bg-primary/90">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-stone-400">
                      Email Us
                    </div>
                    <div className="break-words text-xl font-bold text-white">
                      info@perfectjointdrywall.com
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal as="li" y={20} delay={0.4}>
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-stone-400">
                      Service Area
                    </div>
                    <div className="text-xl font-bold text-white">
                      Greater Toronto &amp; Surrounding Areas
                    </div>
                  </div>
                </div>
              </Reveal>
            </ul>
          </div>

          {/* Right Column: Contact Form */}
          <Reveal x={48} y={0} duration={1} className="relative">
            <Card className="rounded-[2rem] border-0 bg-white shadow-2xl sm:p-6 lg:p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-extrabold text-stone-900">
                  Request a Free Quote
                </CardTitle>
                <p className="mt-2 text-base text-stone-500">
                  Fill out the form below and we&rsquo;ll get back to you within
                  24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  {/* Honeypot: hidden from users, bots fill it in */}
                  <div
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={100}
                        placeholder="John Smith"
                        className="bg-stone-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        maxLength={30}
                        placeholder="(555) 555-0100"
                        className="bg-stone-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="john@example.com"
                      className="bg-stone-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-type">Project Type</Label>
                    {/* Base UI Select: pass `items` so SelectValue shows the label, not the raw value */}
                    <Select
                      items={projectTypeItems}
                      value={projectType}
                      onValueChange={(value) => {
                        setProjectType(value);
                        setProjectTypeError(false);
                      }}
                      name="projectType"
                    >
                      <SelectTrigger
                        id="project-type"
                        aria-invalid={projectTypeError}
                        className="w-full bg-stone-50"
                      >
                        <SelectValue placeholder="Select a project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {projectTypeItems.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                              className="cursor-pointer"
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {projectTypeError && (
                      <p role="alert" className="text-sm text-red-600">
                        Please select a project type.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Project Details</Label>
                    <Textarea
                      id="details"
                      name="details"
                      rows={4}
                      required
                      maxLength={3000}
                      placeholder="Tell us about your project..."
                      className="min-h-[120px] resize-none bg-stone-50"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 h-16 w-full gap-3 rounded-xl text-lg font-bold shadow-lg transition-all hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {submitting ? "Sending..." : "Send Request"}
                    {!submitting && <ArrowRight className="h-6 w-6" />}
                  </Button>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl bg-red-50 px-4 py-4 text-center text-sm font-medium text-red-700 ring-1 ring-red-600/20"
                    >
                      {submitError}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}