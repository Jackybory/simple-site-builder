import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/site/ListingCard";
import { listings } from "@/lib/listings";
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

const steps = [
  { n: "01", title: "List your piece", text: "Tell us what you have — photos, history and any paperwork." },
  { n: "02", title: "We authenticate", text: "Our experts verify signatures, wear and provenance before anything goes live." },
  { n: "03", title: "Sell with confidence", text: "Buyers pay securely and you get paid once the item arrives safely." },
];

const trustPoints = [
  { title: "Expert authentication", text: "Signatures, wear and provenance are checked before anything goes live." },
  { title: "Secure payment", text: "Buyers pay securely, and sellers are paid once the item arrives safely." },
  { title: "Insured shipping", text: "Items are packed with care and shipped tracked and insured." },
  { title: "Real people", text: "Call, email or visit the showroom by appointment before you buy." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-field text-field-foreground">
        <img
          src={heroImage}
          alt="Signed baseball, framed jersey, graded trading cards and a vintage football on display"
          className="absolute inset-0 size-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-field via-field/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-36">
          <div className="max-w-xl animate-rise">
            <p className="text-xs font-bold tracking-[0.25em] text-accent uppercase">{site.tagline}</p>
            <h1 className="mt-5 text-5xl font-extrabold sm:text-6xl md:text-8xl">Own a piece of the game.</h1>
            <p className="mt-6 text-lg text-field-foreground/80">{site.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/shop">Browse the shop</Link>
              </Button>
              <Button asChild variant="field" size="xl">
                <Link to="/contact">Sell an item</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5" aria-label="Why buy from us">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Fresh in the locker</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Featured items</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
            See everything →
          </Link>
        </div>
        <div className="stitch-divider mt-6" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <p className="eyebrow">For collectors</p>
        <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">How selling works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-lg border-2 border-border bg-card p-7">
              <span className="font-display text-5xl font-extrabold text-accent">{s.n}</span>
              <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
