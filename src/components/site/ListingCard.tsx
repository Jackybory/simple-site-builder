import { Link } from "@tanstack/react-router";
import { formatPrice, type Listing } from "@/lib/listings";

export function ListingCard({ item }: { item: Listing }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="eyebrow">{item.sport}</p>
        <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl font-bold">{formatPrice(item.price)}</span>
          <Link to="/contact" className="text-sm font-semibold text-primary hover:underline">
            Ask about it →
          </Link>
        </div>
      </div>
    </article>
  );
}
