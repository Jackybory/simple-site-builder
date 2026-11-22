import jersey from "@/assets/item-jersey.jpg";
import card from "@/assets/item-card.jpg";
import football from "@/assets/item-football.jpg";
import haalandShirt from "@/assets/item-haaland-shirt.jpg";
import brunoShirt from "@/assets/item-bruno-fernandes.jpg";
import manUtdSquadShirt from "@/assets/item-man-utd-squad.jpg";
import salahShirt from "@/assets/item-salah-shirt.jpg";
import sakaShirt from "@/assets/item-saka-shirt.jpg";
import chelseaBall from "@/assets/item-chelsea-ball.jpg";
import tottenhamShirt from "@/assets/item-tottenham-shirt.jpg";
import premierLeagueBall from "@/assets/item-premier-league-ball.jpg";
import liverpoolBall from "@/assets/item-liverpool-ball.jpg";
import manUtdCard from "@/assets/item-man-utd-card.jpg";

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
  tag?: string;
  coa?: string;
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
    image: brunoShirt,
    condition: "Match-worn; full condition report on enquiry",
    authentication: authText,
    provenance: "Match details and photo-matching available on request",
    shipping: shipText,
    reference: "LL-2001",
    tag: "Match-Worn",
    coa: "Official Club Photo-Matched & Certificate of Provenance",
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
    image: manUtdSquadShirt,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2002",
    tag: "Squad-Signed",
    coa: "First-Team Foundation Signing Certificate",
  },
  {
    id: "man-utd-signed-trading-card",
    title: "Manchester United signed trading card",
    club: "Manchester United",
    category: "Trading card",
    detail: "Hand-signed · protective slab",
    description:
      "A 2021-22 Panini Prizm EPL Cristiano Ronaldo Manchester United card, hand-signed and encased in a Beckett 10 Gem Mint slab.",
    price: 240,
    image: manUtdCard,
    condition: "Sealed in protective slab",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2003",
    tag: "Beckett 10",
    coa: "Beckett Authentication Services #00015006649",
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
    image: salahShirt,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2004",
    tag: "1 of 1 · Framed",
    coa: "Liverpool FC Official Hologram #LFC-8821",
  },
  {
    id: "liverpool-squad-signed-football",
    title: "Signed Steven Gerrard Liverpool football, cased",
    club: "Liverpool",
    category: "Football",
    detail: "Hand-signed · acrylic display case",
    description:
      "An official Liverpool football personally signed by club legend Steven Gerrard, presented in a luxury acrylic display case with an engraved plaque.",
    price: 650,
    image: liverpoolBall,
    condition: "Display-ready; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2005",
    tag: "Club Legend",
    coa: "Personally Signed by Steven Gerrard · Authenticated Showcase",
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
    image: haalandShirt,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2006",
    tag: "Treble Hero",
    coa: "Manchester City Official Certificate & Silver Plaque",
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
    image: sakaShirt,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2007",
    tag: "Fan Favourite",
    coa: "Arsenal Direct Official Authentication #ARS-7714",
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
    image: chelseaBall,
    condition: "Display-ready; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2008",
    tag: "Squad-Signed",
    coa: "Cobham Training Centre Signing Certificate",
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
    image: tottenhamShirt,
    condition: "Framed; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2009",
    tag: "Framed",
    coa: "Spurs Official Hologram & Certificate of Authenticity",
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
    image: premierLeagueBall,
    condition: "Display-ready; see enquiry for condition details",
    authentication: authText,
    provenance: "Signing details available on request",
    shipping: shipText,
    reference: "LL-2010",
    tag: "Match Ball",
    coa: "Premier League Official Match-Style Ball Authentication",
  },
];

export type Currency = "GBP" | "USD" | "EUR";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

const CONVERSION_RATES: Record<Currency, { locale: string; rate: number }> = {
  GBP: { locale: "en-GB", rate: 1.0 },
  USD: { locale: "en-US", rate: 1.28 },
  EUR: { locale: "de-DE", rate: 1.18 },
};

export const formatPrice = (n: number, currency: Currency = "GBP") => {
  const { locale, rate } = CONVERSION_RATES[currency] ?? CONVERSION_RATES.GBP;
  const converted = Math.round(n * rate);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(converted);
};

export const getWhatsAppUrl = (item: Listing, customOffer?: number, currency: Currency = "GBP") => {
  const offerText = customOffer ? ` with an offer of ${formatPrice(customOffer, currency)}` : "";
  const msg = encodeURIComponent(
    `Hello Legacy Locker! I am inquiring about "${item.title}" (Ref: ${item.reference}, listed at ${formatPrice(item.price, currency)})${offerText}. Is this still available?`
  );
  return `https://wa.me/442079460000?text=${msg}`;
};
