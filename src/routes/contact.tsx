import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const desc = `Buying or selling sports memorabilia? Get in touch with the ${site.name} team.`;

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { subject?: string } => ({
    subject: typeof search.subject === "string" ? search.subject : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      { name: "description", content: desc },
      { property: "og:title", content: `Contact — ${site.name}` },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  photoUrl: string;
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring";

function Contact() {
  const { subject } = Route.useSearch();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    interest: subject ? "Buying an item" : "General enquiry",
    message: subject ? `Hello, I would like to enquire about: ${subject}` : "",
    photoUrl: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);

  const update = (field: keyof FormState, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please tell us how we can help.";
    setErrors(next);
    setReady(Object.keys(next).length === 0);
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${form.interest} — ${form.name}`)}&body=${encodeURIComponent(
    [
      form.message,
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : "",
      form.photoUrl ? `Photos: ${form.photoUrl}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  )}`;

  return (
    <section className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
      <p className="eyebrow">Get in touch</p>
      <h1 className="mt-3 text-4xl font-extrabold sm:text-6xl md:text-7xl">Buying or selling? Let's talk.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Ask about an item in the shop, or tell us about a piece you'd like to sell. We reply within one business day.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border-2 border-border bg-card p-6 sm:p-8">
          {ready ? (
            <div className="rounded-lg border border-primary/40 bg-primary/10 p-6">
              <h2 className="text-3xl font-bold">One last step</h2>
              <p className="mt-3 text-muted-foreground">
                Thanks, {form.name.split(" ")[0]}. Your enquiry is ready. Press the button to open it in your email app and send it to {site.email}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <a href={mailto}>Send by email</a>
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => setReady(false)}>
                  Edit enquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Full name *</span>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? <span className="mt-1 block text-sm text-destructive">{errors.name}</span> : null}
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Email address *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? <span className="mt-1 block text-sm text-destructive">{errors.email}</span> : null}
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Phone number</span>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">I am interested in</span>
                  <select value={form.interest} onChange={(e) => update("interest", e.target.value)} className={inputClass}>
                    <option>Buying an item</option>
                    <option>Selling an item</option>
                    <option>General enquiry</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Message *</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={inputClass}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message ? <span className="mt-1 block text-sm text-destructive">{errors.message}</span> : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Photo link (optional, for sellers)</span>
                <input
                  type="url"
                  value={form.photoUrl}
                  onChange={(e) => update("photoUrl", e.target.value)}
                  placeholder="Paste a link to photos of your item"
                  className={inputClass}
                />
              </label>

              <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                Prepare enquiry
              </Button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg bg-field p-7 text-field-foreground">
            <h2 className="text-3xl font-bold">Reach us</h2>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild variant="gold" size="lg">
                <a href={site.phoneHref}>Call {site.phone}</a>
              </Button>
              <Button asChild variant="field" size="lg">
                <a href={`mailto:${site.email}`}>Email us</a>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border-2 border-border bg-card p-7">
            <h2 className="text-3xl font-bold">Hours</h2>
            <dl className="mt-5 space-y-3">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted-foreground">{h.days}</dt>
                  <dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border-2 border-border bg-card p-7">
            <h2 className="text-3xl font-bold">Showroom</h2>
            <p className="mt-5">{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p className="mt-3 text-sm text-muted-foreground">Viewings by appointment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
