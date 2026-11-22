import baseball from "@/assets/item-baseball.jpg";
import jersey from "@/assets/item-jersey.jpg";
import card from "@/assets/item-card.jpg";
import football from "@/assets/item-football.jpg";

export type Listing = {
  id: string;
  title: string;
  sport: "Baseball" | "Basketball" | "Football";
  category: string;
  detail: string;
  description: string;
  price: number;
  image: string;
  condition: string;
  authentication: string;
  provenance: string;
  shipping: string;
  reference: string;
};

// Sample listings shown on the site. Edit details to match the real items.
export const listings: Listing[] = [
  {
    id: "team-signed-baseball",
    title: "1950s team-signed baseball",
    sport: "Baseball",
    category: "Baseball",
    detail: "20+ signatures · display cube included",
    description:
      "A team-signed baseball from the 1950s, presented in a protective display cube. The ball carries more than 20 signatures.",
    price: 2450,
    image: baseball,
    condition: "Vintage; see enquiry for full condition report",
    authentication: "Signature and provenance review before listing",
    provenance: "Full history available on request",
    shipping: "Insured, tracked shipping. Ask us for a quote.",
    reference: "LL-1001",
  },
  {
    id: "framed-23-jersey",
    title: "Signed #23 home jersey, framed",
    sport: "Basketball",
    category: "Jersey",
    detail: "Shadow box · certificate of authenticity",
    description:
      "A framed, signed #23 home basketball jersey presented in a protective shadow box and supplied with a certificate of authenticity.",
    price: 3800,
    image: jersey,
    condition: "Framed in a shadow box; see enquiry for condition details",
    authentication: "Certificate of authenticity included",
    provenance: "Full history available on request",
    shipping: "Insured, tracked shipping. Ask us for a quote.",
    reference: "LL-1002",
  },
  {
    id: "graded-qb-card",
    title: "Vintage quarterback rookie card",
    sport: "Football",
    category: "Trading card",
    detail: "Graded 7 · protective slab",
    description:
      "A vintage quarterback rookie card graded 7 and preserved in a protective slab.",
    price: 1150,
    image: card,
    condition: "Graded 7; sealed in protective slab",
    authentication: "Professionally graded and encapsulated",
    provenance: "Full history available on request",
    shipping: "Insured, tracked shipping. Ask us for a quote.",
    reference: "LL-1003",
  },
  {
    id: "team-signed-football",
    title: "Championship team-signed football",
    sport: "Football",
    category: "Football",
    detail: "Original leather · wooden stand",
    description:
      "A championship team-signed football in original leather, supplied with a wooden display stand.",
    price: 2900,
    image: football,
    condition: "Original leather; see enquiry for condition details",
    authentication: "Team signature and provenance review before listing",
    provenance: "Full history available on request",
    shipping: "Insured, tracked shipping. Ask us for a quote.",
    reference: "LL-1004",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
