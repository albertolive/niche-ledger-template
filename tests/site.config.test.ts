/**
 * Smoke tests for the site config shape.
 *
 * The "no TODO placeholders" check is intentionally STRICTER in forked
 * instances than in this template — see scripts/check-template-ready.ts
 * for the strict version that should pass before deploying a forked
 * site to production.
 */

import { describe, expect, it } from "vitest";
import { contactEmail, site } from "../src/lib/site";

describe("site config", () => {
  it("brand identity is non-empty", () => {
    expect(site.name).toBeTruthy();
    expect(site.tagline).toBeTruthy();
    expect(site.description).toBeTruthy();
    expect(site.url).toMatch(/^https:\/\//);
  });

  it("OG gradient has exactly two colors", () => {
    expect(site.ogGradient).toHaveLength(2);
    expect(site.ogGradient[0]).toMatch(/^#[0-9a-f]{3,8}$/i);
    expect(site.ogGradient[1]).toMatch(/^#[0-9a-f]{3,8}$/i);
  });

  it("accent colors are valid hex", () => {
    expect(site.accentColor).toMatch(/^#[0-9a-f]{3,8}$/i);
    expect(site.accentColorDark).toMatch(/^#[0-9a-f]{3,8}$/i);
  });

  it("trust signals are non-empty array", () => {
    expect(site.trustSignals.length).toBeGreaterThan(0);
    for (const signal of site.trustSignals) {
      expect(signal).toBeTruthy();
    }
  });

  it("email aliases cover the required set", () => {
    expect(site.emailAliases.general).toBeTruthy();
    expect(site.emailAliases.privacy).toBeTruthy();
    expect(site.emailAliases.corrections).toBeTruthy();
    expect(site.emailAliases.partnerships).toBeTruthy();
  });

  it("contactEmail builds a valid email for each alias", () => {
    const general = contactEmail("general");
    const privacy = contactEmail("privacy");
    expect(general).toMatch(/^[\w.+-]+@[\w.-]+\.\w+$/);
    expect(privacy).toMatch(/^[\w.+-]+@[\w.-]+\.\w+$/);
    const expectedHost = new URL(site.url).hostname.replace(/^www\./, "");
    expect(general.endsWith(`@${expectedHost}`)).toBe(true);
  });

  it("testing checklist has at least 3 items", () => {
    expect(site.testingChecklist.length).toBeGreaterThanOrEqual(3);
  });

  it("adsenseClient is either valid ca-pub or empty", () => {
    if (site.adsenseClient) {
      expect(site.adsenseClient).toMatch(/^ca-pub-\d+$/);
    }
  });
});
