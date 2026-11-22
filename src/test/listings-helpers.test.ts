import { describe, expect, it } from "vitest";
import { formatPrice, getWhatsAppUrl, listings } from "@/lib/listings";

describe("Listing helpers", () => {
  it("formats GBP by default and handles USD and EUR", () => {
    expect(formatPrice(1000, "GBP")).toContain("1,000");
    expect(formatPrice(1000, "USD")).toContain("1,280");
    expect(formatPrice(1000, "EUR")).toContain("1.180");
  });

  it("builds a pre-filled WhatsApp URL with item details", () => {
    const item = listings[0];
    const url = getWhatsAppUrl(item, 1500, "GBP");
    expect(url).toContain("https://wa.me/442079460000");
    expect(url).toContain(encodeURIComponent(item.title));
    expect(url).toContain(encodeURIComponent(item.reference));
  });
});
