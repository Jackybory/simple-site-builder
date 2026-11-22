import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/site/ListingCard";
import { listings, type Currency } from "@/lib/listings";
import { site } from "@/lib/site";
import heroImage from "@/assets/memorabilia-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Authenticated Sports Memorabilia` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — Authenticated Sports Memorabilia` },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featuredClubs = [
  "Manchester City",
  "Liverpool",
  "Arsenal",
  "Manchester United",
  "Chelsea",
  "Tottenham Hotspur",
];

const steps = [
  { n: "01", title: "Submit your piece", text: "Share photos, provenance and certificates of your item for preliminary assessment." },
  { n: "02", title: "Forensic verification", text: "Our authenticators verify stitch patterns, signature ink, holograms and photo-matching." },
  { n: "03", title: "Acquire & cherish", text: "Dispatched via fully insured courier, or collected in person by appointment." },
];

const trustPoints = [
  { icon: "🛡️", title: "Lifetime Authenticity", text: "100% money-back guarantee backing every signature, hologram, and piece of provenance." },
  { icon: "📦", title: "White-Glove Delivery", text: "Museum-grade protective crating, tracked and fully insured up to £50,000 door-to-door." },
  { icon: "🔍", title: "14-Day Inspection", text: "Review your memorabilia in person with full return protection." },
  { icon: "🤝", title: "Private Concierge", text: "Speak directly with our acquisitions team via WhatsApp or London showroom appointment." },
];

function Index() {
  const [currency, setCurrency] = useState<Currency>("GBP");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-field text-field-foreground">
        <img
          src={heroImage}
          alt="Framed English football shirts, signed leather boxing gloves and championship memorabilia"
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-field via-field/85 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-32">
          <div className="max-w-xl animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold tracking-[0.2em] text-accent uppercase backdrop-blur-md">
              Football & Boxing Heritage
            </span>
            <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-8xl">
              Own a piece of the game.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-field-foreground/80 md:text-lg">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/shop">Explore The Vault</Link>
              </Button>
              <Button asChild variant="field" size="xl">
                <Link to="/contact">Consign / Sell a Piece</Link>
              </Button>
            </div>

            {/* Quick Club Links */}
            <div className="mt-10 pt-6 border-t border-field-foreground/15">
              <p className="text-xs font-bold uppercase tracking-wider text-field-foreground/60">
                Explore by Club
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {featuredClubs.map((club) => (
                  <Link
                    key={club}
                    to="/shop"
                    search={{ item: undefined }}
                    className="rounded-full bg-field-foreground/10 px-3 py-1 text-xs font-semibold text-field-foreground transition-colors hover:bg-field-foreground/20 hover:text-white"
                  >
                    {club}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="mx-auto mt-16 max-w-6xl px-5" aria-label="Why collectors trust us">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden="true">
                {p.icon}
              </span>
              <h2 className="mt-3 text-lg font-bold text-foreground">{p.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Items */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Fresh in the locker</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">Featured pieces</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Currency toggle */}
            <div className="flex items-center gap-1 rounded-full border border-border/70 bg-card p-0.5 text-xs font-bold shadow-sm">
              {(["GBP", "USD", "EUR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    currency === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
              View All 10 Pieces →
            </Link>
          </div>
        </div>
        <div className="stitch-divider mt-6" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.slice(0, 8).map((item) => (
            <ListingCard key={item.id} item={item} currency={currency} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto mt-24 mb-16 max-w-6xl px-5">
        <p className="eyebrow">For collectors</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">How acquisition & selling works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
              <span className="font-display text-4xl font-extrabold text-accent">{s.n}</span>
              <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
