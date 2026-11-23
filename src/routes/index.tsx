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
      { title: `${site.name} — Authenticated Sports Memorabilia Archive` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — Authenticated Sports Memorabilia Archive` },
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

const acquisitionStages = [
  {
    step: "Stage I",
    title: "Provenance & Intake",
    description: "Submit certificate records, high-resolution imagery, and match details for preliminary verification by our senior specialists.",
  },
  {
    step: "Stage II",
    title: "Forensic Authentication",
    description: "Every item undergoes rigorous multi-point analysis: fabric weave, match-photo comparison, hologram tracking, and signature ink validation.",
  },
  {
    step: "Stage III",
    title: "Insured Settlement",
    description: "Dispatched in bespoke museum-grade protective packaging with full door-to-door cargo insurance, or private London viewing.",
  },
];

const guarantees = [
  {
    title: "100% Lifetime Provenance",
    detail: "Every signature, patch, and certificate backed unconditionally for life.",
  },
  {
    title: "White-Glove Insured Transit",
    detail: "Bespoke protective crating, tracked and fully insured up to £50,000 door-to-door.",
  },
  {
    title: "14-Day Physical Inspection",
    detail: "Private examination window with full escrow settlement protection.",
  },
  {
    title: "Private Concierge Desk",
    detail: "Direct WhatsApp consultation with our London acquisitions team.",
  },
];

function Index() {
  const [currency, setCurrency] = useState<Currency>("GBP");

  return (
    <>
      {/* Editorial Museum Hero */}
      <section className="relative overflow-hidden bg-field text-field-foreground">
        <img
          src={heroImage}
          alt="Framed match-worn football shirts, championship boxing gloves, and cased match balls"
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-field via-field/80 to-field/20" />
        
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-2xl animate-rise">
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wide text-accent">
              <span className="size-2 rounded-full bg-accent" />
              <span>Premier League & Championship Boxing Archives</span>
            </div>

            <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-8xl">
              Own an authenticated piece of the game.
            </h1>

            <p className="mt-6 text-base leading-relaxed text-field-foreground/80 md:text-lg">
              {site.description} Museum-grade match-worn shirts, legend-signed match balls, and investment-grade collectibles with verifiable provenance.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button asChild variant="hero" size="xl">
                <Link to="/shop">Explore The Collection</Link>
              </Button>
              <Button asChild variant="field" size="xl">
                <Link to="/contact">Consign / Sell a Piece</Link>
              </Button>
            </div>

            {/* Live Vault Status Bar */}
            <div className="mt-10 border-t border-field-foreground/15 pt-6">
              <p className="text-xs font-semibold text-field-foreground/60">
                Filter by Club & Association
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {featuredClubs.map((club) => (
                  <Link
                    key={club}
                    to="/shop"
                    search={{ item: undefined }}
                    className="rounded-full bg-field-foreground/10 px-3.5 py-1 text-xs font-semibold text-field-foreground transition-all hover:bg-field-foreground/20 hover:text-white"
                  >
                    {club}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collector's Guarantee Charter (Unified Panel) */}
      <section className="mx-auto -mt-6 max-w-6xl px-5 relative z-10" aria-label="Collector Guarantees">
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 divide-y divide-border/40 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {guarantees.map((g, i) => (
              <div key={g.title} className={i !== 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}>
                <h2 className="text-base font-bold text-foreground">{g.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Curated Acquisitions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-inspected Premier League kits, legend-signed match balls, and authenticated graded slabs.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency toggle */}
            <div className="flex items-center gap-1 rounded-full border border-border/70 bg-card p-1 text-xs font-semibold shadow-sm">
              <span className="pl-2 pr-1 text-[0.68rem] text-muted-foreground uppercase">
                Currency
              </span>
              {(["GBP", "USD", "EUR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-2.5 py-0.5 transition-colors ${
                    currency === c ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <Link
              to="/shop"
              className="text-xs font-bold text-primary hover:underline"
            >
              View Complete Archive
            </Link>
          </div>
        </div>

        <div className="stitch-divider mt-6" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.slice(0, 8).map((item) => (
            <ListingCard key={item.id} item={item} currency={currency} />
          ))}
        </div>
      </section>

      {/* Authentication & Consignment Sequence */}
      <section className="mx-auto mt-24 mb-16 max-w-6xl px-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Authentication & Acquisition Protocol
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            How every piece of sporting heritage is verified, graded, and placed with discerning collectors.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {acquisitionStages.map((stage) => (
            <div
              key={stage.step}
              className="rounded-2xl border border-border/80 bg-card p-7 shadow-sm transition-all hover:border-primary/30"
            >
              <span className="font-mono text-xs font-bold text-accent tracking-wider uppercase">
                {stage.step}
              </span>
              <h3 className="mt-2 text-xl font-bold text-foreground">
                {stage.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
