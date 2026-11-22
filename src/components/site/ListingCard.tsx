import { Link } from "@tanstack/react-router";
import { formatPrice, type Listing, type Currency } from "@/lib/listings";

export function ListingCard({
  item,
  currency = "GBP",
}: {
  item: Listing;
  currency?: Currency;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
      <Link
        to="/shop"
        search={{ item: item.id }}
        className="relative block aspect-square overflow-hidden bg-secondary/50"
        aria-label={`View details for ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.tag && (
            <span className="rounded-full bg-primary/95 px-2.5 py-0.5 text-[0.68rem] font-semibold tracking-wide text-primary-foreground shadow-sm backdrop-blur-md">
              {item.tag}
            </span>
          )}
          <span className="rounded-full border border-border/60 bg-background/85 px-2.5 py-0.5 text-[0.68rem] font-medium tracking-wide text-foreground shadow-sm backdrop-blur-md">
            Verified
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-muted-foreground/80">
          {item.club}
        </p>

        <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground line-clamp-2">
          {item.title}
        </h3>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-1">{item.detail}</p>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-border/40">
          <div>
            <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground block">
              Investment Price
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              {formatPrice(item.price, currency)}
            </span>
          </div>
          <Link
            to="/shop"
            search={{ item: item.id }}
            className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Inspect →
          </Link>
        </div>
      </div>
    </article>
  );
}
