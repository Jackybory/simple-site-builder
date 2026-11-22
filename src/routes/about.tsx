import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/lib/site";

const desc = `Why collectors trust ${site.name}: expert authentication, honest grading and secure delivery.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About & Authentication — ${site.name}` },
      { name: "description", content: desc },
      { property: "og:title", content: `About & Authentication — ${site.name}` },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const promises = [
  { title: "Expert checked", text: "Every signature and piece is reviewed by our authentication team before listing." },
  { title: "Certificate included", text: "Each item ships with a certificate of authenticity and its full history." },
  { title: "Insured delivery", text: "Items are packed by hand and fully insured until they reach your door." },
];

function About() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-14 md:pt-20">
      <p className="eyebrow">Our story</p>
      <h1 className="mt-3 text-6xl font-extrabold md:text-7xl">Built by collectors, for collectors.</h1>
      <div className="mt-8 space-y-5 text-lg text-muted-foreground">
        <p>
          {site.name} started with a shoebox of baseball cards and a lot of questions: Is this signature
          real? What is it worth? Who can I trust to buy it?
        </p>
        <p>
          We built a marketplace that answers those questions for every item. Collectors list their
          pieces, our team verifies them, and fans everywhere can buy knowing exactly what they're getting.
        </p>
      </div>

      <div className="stitch-divider mt-14" />

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {promises.map((p) => (
          <div key={p.title}>
            <h2 className="text-3xl font-bold">{p.title}</h2>
            <p className="mt-2 text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
