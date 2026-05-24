import { describe, expect, it } from "vitest";
import { deriveInitials } from "../src/lib/brand";

describe("deriveInitials", () => {
  it("returns initials of the first two words", () => {
    expect(deriveInitials("Lawn Care Ledger")).toBe("LC");
    expect(deriveInitials("Niche Ledger")).toBe("NL");
  });

  it("strips apostrophes without splitting into a fake word", () => {
    // Regression: "Landlord's Ledger" used to give "LS" because the
    // apostrophe got replaced with a space, producing ["Landlord","s","Ledger"].
    expect(deriveInitials("Landlord's Ledger")).toBe("LL");
  });

  it("falls back to two-letter slice for single-word names", () => {
    expect(deriveInitials("Stessa")).toBe("ST");
  });

  it("returns a placeholder for empty / punctuation-only names", () => {
    expect(deriveInitials("")).toBe("·");
    expect(deriveInitials("---")).toBe("·");
  });

  it("collapses internal punctuation (no fake words from hyphens)", () => {
    expect(deriveInitials("B&B Reviews")).toBe("BR");
    expect(deriveInitials("Mom-and-Pop Ledger")).toBe("ML");
  });
});
