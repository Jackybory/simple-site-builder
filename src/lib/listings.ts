import jersey from "@/assets/item-jersey.jpg";
import card from "@/assets/item-card.jpg";
import football from "@/assets/item-football.jpg";

export type Listing = {
  id: string;
  title: string;
  club: string;
  category: "Shirt" | "Football" | "Trading card";
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

// SAMPLE DATA ONLY. Replace titles, prices (in GBP), photos and provenance with real stock.
// Images are shared placeholders until real product photos are uploaded.
const authText = "Certificate and proof of provenance provided on enquiry";
const shipText = "Insured, tracked shipping. Ask us for a quote.";

export const listings: Listing[] = [
  {
    id: "bruno-fernandes-match-worn-shirt",
    title: "Signed Bruno Fernandes match-worn shirt",
    club: "Manchester United",
    category: "Shirt",
    detail: "Match-worn · hand-signed · display frame",
    description:
      "A Manchester United shirt worn in a first-team match and signed by Bruno Fernandes. A centrepiece for any United collection.",
    price: 1850,
    image: jersey,
    condition: "Match-worn; full condition report on enquiry",
    authentication: authText,
    provenance: "Match details and photo-matching available on request",
    shipping: shipText,
    reference: "LL-2001",
  },
  {
    id: "man-utd-squad-signed-shirt",
    title: "Manchester United squad-signed shirt, framed",
    club: "Manchester United",
    category: "Shirt",
    detail: "Multiple first-team signatures · framed",
    description:
      "A home shirt signed by members of the Manchester United first-team squad and presented in a protective frame.",
    price: 1250,
    image: jersey,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2002",
  },
  {
    id: "man-utd-signed-trading-card",
    title: "Manchester United signed trading card",
    club: "Manchester United",
    category: "Trading card",
    detail: "Hand-signed · protective slab",
    description:
      "A Manchester United trading card signed by the player and sealed in a protective slab for display or storage.",
    price: 240,
    image: card,
    condition: "Sealed in protective slab",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2003",
  },
  {
    id: "salah-signed-liverpool-shirt",
    title: "Signed Mohamed Salah Liverpool shirt, framed",
    club: "Liverpool",
    category: "Shirt",
    detail: "Hand-signed · framed display",
    description:
      "A Liverpool home shirt signed by Mohamed Salah and presented in a protective frame.",
    price: 1400,
    image: jersey,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2004",
  },
  {
    id: "liverpool-squad-signed-football",
    title: "Liverpool squad-signed football",
    club: "Liverpool",
    category: "Football",
    detail: "Multiple signatures · display stand",
    description:
      "A football signed by members of the Liverpool first-team squad, supplied with a display stand.",
    price: 650,
    image: football,
    condition: "Display-ready; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2005",
  },
  {
    id: "haaland-signed-man-city-shirt",
    title: "Signed Erling Haaland Manchester City shirt",
    club: "Manchester City",
    category: "Shirt",
    detail: "Hand-signed · framed display",
    description:
      "A Manchester City home shirt signed by Erling Haaland and presented in a protective frame.",
    price: 1500,
    image: jersey,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2006",
  },
  {
    id: "saka-signed-arsenal-shirt",
    title: "Signed Bukayo Saka Arsenal shirt, framed",
    club: "Arsenal",
    category: "Shirt",
    detail: "Hand-signed · framed display",
    description:
      "An Arsenal home shirt signed by Bukayo Saka and presented in a protective frame.",
    price: 1100,
    image: jersey,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2007",
  },
  {
    id: "chelsea-signed-football",
    title: "Chelsea squad-signed football",
    club: "Chelsea",
    category: "Football",
    detail: "Multiple signatures · display stand",
    description:
      "A football signed by members of the Chelsea first-team squad, supplied with a display stand.",
    price: 580,
    image: football,
    condition: "Display-ready; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2008",
  },
  {
    id: "tottenham-signed-shirt",
    title: "Tottenham Hotspur squad-signed shirt, framed",
    club: "Tottenham Hotspur",
    category: "Shirt",
    detail: "Multiple signatures · framed display",
    description:
      "A Tottenham Hotspur home shirt signed by members of the first-team squad and presented in a protective frame.",
    price: 950,
    image: jersey,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2009",
  },
  {
    id: "premier-league-signed-match-ball",
    title: "Premier League match ball, squad-signed",
    club: "Premier League",
    category: "Football",
    detail: "Match-style ball · multiple signatures",
    description:
      "A Premier League match-style football carrying multiple player signatures, supplied with a display stand.",
    price: 720,
    image: football,
    condition: "Display-ready; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2010",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
