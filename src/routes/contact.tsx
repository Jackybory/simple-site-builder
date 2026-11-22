import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const desc = `Buying or selling sports memorabilia? Get in touch with the ${site.name} team.`;

export const Route = createFileRoute("/contact")({
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

function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
      <p className="eyebrow">Get in touch</p>
      <h1 className="mt-3 text-6xl font-extrabold md:text-7xl">Buying or selling? Let's talk.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Ask about an item in the shop, or tell us about a piece you'd like to sell. We reply within one business day.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-field p-7 text-field-foreground md:col-span-1">
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
    </section>
  );
}
