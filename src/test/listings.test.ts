import { describe, expect, it } from "vitest";

import { listings, sports } from "@/lib/listings";

const premierLeagueClubs = ["Manchester United", "Liverpool", "Arsenal", "Chelsea"];

describe("Shop listings", () => {
  it("carries a Premier League item for every club the shop sells", () => {
    const premierLeague = listings.filter((l) => l.sport === "Premier League");

    expect(premierLeague.length).toBeGreaterThanOrEqual(premierLeagueClubs.length);

    for (const club of premierLeagueClubs) {
      expect(premierLeague.some((l) => l.title.includes(club))).toBe(true);
    }
  });

  it("gives every listing a sport the shop can filter by", () => {
    for (const item of listings) {
      expect(sports).toContain(item.sport);
    }
  });

  it("prices every listing above zero", () => {
    for (const item of listings) {
      expect(item.price).toBeGreaterThan(0);
    }
  });
});
