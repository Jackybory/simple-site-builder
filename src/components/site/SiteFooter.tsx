import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-field text-field-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-bold uppercase">{site.name}</p>
          <p className="mt-2 text-sm text-field-foreground/70">{site.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Explore</p>
          <div className="mt-3 flex flex-col gap-1.5">
            <Link to="/shop" className="hover:text-accent">Shop memorabilia</Link>
            <Link to="/about" className="hover:text-accent">How authentication works</Link>
            <Link to="/contact" className="hover:text-accent">Sell with us</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Contact</p>
          <a href={site.phoneHref} className="mt-3 block hover:text-accent">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="block hover:text-accent">{site.email}</a>
          <p className="mt-2 text-field-foreground/70">{site.address.line1}, {site.address.line2}</p>
        </div>
      </div>
      <p className="border-t border-field-foreground/15 py-5 text-center text-xs text-field-foreground/60">
        © {new Date().getFullYear()} {site.name}. Every item authenticated.
      </p>
    </footer>
  );
}
