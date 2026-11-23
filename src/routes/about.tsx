import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

const desc = `Why collectors trust ${site.name}: forensic authentication, museum-grade conservation, and guaranteed lifetime provenance.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About & Authentication Protocol — ${site.name}` },
      { name: "description", content: desc },
      { property: "og:title", content: `About & Authentication Protocol — ${site.name}` },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const standards = [
  {
    title: "Forensic Authentication",
    description: "Every signature, shirt weave, patch alignment, and hologram is verified against club photographic archives and match footage before listing.",
  },
  {
    title: "Lifetime Provenance Dossier",
    description: "Each acquisition is delivered with its physical Certificate of Authenticity (COA), signing session documentation, and our 100% money-back guarantee.",
  },
  {
    title: "White-Glove Insured Logistics",
    description: "Items are mounted in museum-grade UV-filtering conservation cases and dispatched via tracked, high-value couriers with up to £50,000 transit cover.",
  },
];

function About() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24 md:pt-18">
      <div>
        <p className="text-xs font-bold tracking-wider text-primary uppercase">
          Archive & Heritage
        </p>
        <h1 className="mt-2 text-5xl font-extrabold sm:text-6xl md:text-7xl">
          Built for collectors who demand undeniable provenance.
        </h1>
      </div>

      <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
        <p>
          {site.name} was established by passionate English football and championship boxing collectors who saw a persistent challenge in the memorabilia world: counterfeit autographs, unverified match-worn claims, and questionable certificates.
        </p>
        <p>
          We created a sanctuary for authentic sporting history. Operating from our private London appointments desk, our specialists work directly with former players, club foundations, and certified authenticators to curate only indisputable pieces.
        </p>
        <p>
          Whether acquiring a match-worn Premier League captain's jersey or a title-fight signed artifact, every collector receives absolute certainty, documented provenance, and museum-grade presentation.
        </p>
      </div>

      <div className="stitch-divider mt-12" />

      {/* Core Standards Grid */}
      <div className="mt-12">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          The Legacy Locker Standard
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {standards.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Callout */}
      <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">Private London Showroom Appointments</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Arrange a private viewing of pieces in the vault or consult our acquisitions team regarding consignment.
          </p>
        </div>
        <Button asChild variant="hero" size="lg" className="mt-4 sm:mt-0">
          <Link to="/contact">Book a Consultation</Link>
        </Button>
      </div>
    </section>
  );
}
