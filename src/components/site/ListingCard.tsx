import { Link } from "@tanstack/react-router";
import { formatPrice, type Listing } from "@/lib/listings";

export function ListingCard({ item }: { item: Listing }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/shop"
        search={{ item: item.id }}
        className="block aspect-square overflow-hidden bg-secondary"
        aria-label={`View details for ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow">{item.sport}</p>
          <span className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
            Authenticated
          </span>
        </div>

        <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-2xl font-bold">{formatPrice(item.price)}</span>
          <Link
            to="/shop"
            search={{ item: item.id }}
            className="text-sm font-semibold text-primary hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}
