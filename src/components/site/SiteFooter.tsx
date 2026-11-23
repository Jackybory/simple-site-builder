import { Link } from "@tanstack/react-router";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-field-foreground/10 bg-field text-field-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded bg-primary font-display text-sm font-bold text-primary-foreground">
              LL
            </span>
            <span className="font-display text-2xl font-bold uppercase tracking-tight">
              {site.name}
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-field-foreground/70">
            {site.tagline}. Authenticated Premier League match-worn kits, legend-signed match balls, and championship sports memorabilia.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[0.72rem] text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            <span>London Acquisitions Desk & Private Vault</span>
          </div>
        </div>

        <div className="text-xs">
          <h3 className="font-sans text-xs font-bold tracking-wider text-accent uppercase">
            Collection & Archives
          </h3>
          <div className="mt-4 flex flex-col gap-2.5 text-field-foreground/80">
            <Link to="/shop" className="hover:text-accent transition-colors">Browse The Vault</Link>
            <Link to="/shop" search={{ item: undefined }} className="hover:text-accent transition-colors">Premier League Shirts</Link>
            <Link to="/shop" search={{ item: undefined }} className="hover:text-accent transition-colors">Squad Match Balls</Link>
            <Link to="/shop" search={{ item: undefined }} className="hover:text-accent transition-colors">Graded Trading Cards</Link>
          </div>
        </div>

        <div className="text-xs">
          <h3 className="font-sans text-xs font-bold tracking-wider text-accent uppercase">
            Provenance & Standards
          </h3>
          <ul className="mt-4 space-y-2.5 text-field-foreground/80">
            <li>100% Lifetime Authenticity Guarantee</li>
            <li>Multi-point Forensic Verification</li>
            <li>Fully Insured Courier Logistics</li>
            <li>Private London Showroom Viewings</li>
          </ul>
        </div>

        <div className="text-xs">
          <h3 className="font-sans text-xs font-bold tracking-wider text-accent uppercase">
            Specialist Contact
          </h3>
          <div className="mt-4 space-y-2 text-field-foreground/80">
            <p>
              <a href={site.phoneHref} className="hover:text-accent transition-colors font-semibold">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors">
                {site.email}
              </a>
            </p>
            <p className="text-field-foreground/60 leading-relaxed">
              {site.address.line1}, {site.address.line2}
            </p>
            <p className="text-[0.7rem] text-accent/90 pt-1">
              WhatsApp Concierge: Available 7 days/week
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-field-foreground/10 py-6 text-center text-xs text-field-foreground/60">
        <p>© {new Date().getFullYear()} {site.name}. All signatures, fabrics and provenance forensically verified.</p>
      </div>
    </footer>
  );
}
