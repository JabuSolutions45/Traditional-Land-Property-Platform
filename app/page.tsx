import Link from "next/link";
import { LocationSearchForm } from "@/components/location-search-form";
import { PageShell } from "@/components/page-shell";

const steps = [
  [
    "1",
    "Find the area",
    "Search using the village, town, municipality or traditional authority you know.",
  ],
  [
    "2",
    "Read the record",
    "See what information was supplied, what was checked and what is still pending.",
  ],
  [
    "3",
    "Speak safely",
    "Send interest through Umeli before personal contact details are shared.",
  ],
] as const;

export default function Home() {
  return (
    <PageShell>
      <section className="home-hero" aria-labelledby="page-title">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">South African customary-land property</p>
            <h1 id="page-title">Find the place. Understand the process.</h1>
            <p className="intro">
              Umeli is a simple property-information service designed around
              villages, communities and the authorities that serve them.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/properties">
                Find property
              </Link>
              <Link className="button button-light" href="/sell">
                Sell a property
              </Link>
            </div>
            <p className="pilot-note">
              <span aria-hidden="true">●</span> Pilot preparation: Giyani,
              Malamulele and Venda
            </p>
          </div>
          <div className="search-card" aria-label="National area search">
            <p className="search-label">Where are you looking?</p>
            <LocationSearchForm compact />
            <div className="popular-areas">
              <span>Popular:</span>
              <Link href="/properties?q=Giyani">Giyani</Link>
              <Link href="/properties?q=Malamulele">Malamulele</Link>
              <Link href="/properties?q=Diepsloot">Diepsloot</Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="trust-strip"
        aria-label="Important service information"
      >
        <div className="shell trust-grid">
          <p>
            <strong>Clear location context</strong>
            <span>Village, ward, municipality and authority links</span>
          </p>
          <p>
            <strong>Descriptive checks</strong>
            <span>No vague “verified” promises</span>
          </p>
          <p>
            <strong>People remain involved</strong>
            <span>Important decisions stay reviewable</span>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="start-title">
        <div className="shell">
          <p className="eyebrow">Simple from the start</p>
          <h2 id="start-title">What do you want to do?</h2>
          <div className="choice-grid">
            <article className="choice-card green-card">
              <span className="choice-icon" aria-hidden="true">
                ⌕
              </span>
              <h3>Find a property</h3>
              <p>
                Browse by the place names people use, with enough context to
                distinguish similar areas.
              </p>
              <Link href="/properties">Start searching →</Link>
            </article>
            <article className="choice-card gold-card">
              <span className="choice-icon" aria-hidden="true">
                ＋
              </span>
              <h3>Sell a property</h3>
              <p>
                Learn what information, photographs and community review steps
                may be needed.
              </p>
              <Link href="/sell">See the seller journey →</Link>
            </article>
            <article className="choice-card cream-card">
              <span className="choice-icon" aria-hidden="true">
                i
              </span>
              <h3>Understand Umeli</h3>
              <p>
                See what the service records, who reviews information and what
                it cannot prove.
              </p>
              <Link href="/how-it-works">How it works →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section steps-section" aria-labelledby="steps-title">
        <div className="shell split-heading">
          <div>
            <p className="eyebrow">For buyers</p>
            <h2 id="steps-title">A safer way to begin</h2>
          </div>
          <p>
            Umeli will show the status of each check separately, helping buyers
            ask better questions without exposing private seller information.
          </p>
        </div>
        <div className="shell step-grid">
          {steps.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="legal-banner">
        <div className="shell">
          <strong>Important:</strong> Umeli records submitted information and
          review steps. It does not determine ownership, title or legal
          validity. <Link href="/how-it-works">Understand the checks</Link>
        </div>
      </section>
    </PageShell>
  );
}
