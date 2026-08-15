import { PageShell } from "@/components/page-shell";
export default function HelpPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="shell narrow">
          <p className="eyebrow">Help and safety</p>
          <h1>Stop and ask when something is unclear</h1>
          <p>
            Simple guidance for buyers, sellers and communities using Umeli.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell faq-list">
          <article>
            <h2>Someone asks me to pay Umeli directly</h2>
            <p>
              Do not pay. The first release will not hold money, deposits or
              escrow funds.
            </p>
          </article>
          <article>
            <h2>A village or ward is incorrect</h2>
            <p>
              Submit a correction when the pilot opens. The existing source,
              suggested change, reviewer and decision will be recorded.
            </p>
          </article>
          <article>
            <h2>A badge says “Traditional Authority Confirmed”</h2>
            <p>
              Open the badge explanation. It must state what was confirmed, by
              whom, when and what the confirmation does not prove.
            </p>
          </article>
          <article>
            <h2>I am being pressured or harassed</h2>
            <p>
              Do not share personal details. Buyer enquiries will remain in the
              platform until contact-release rules allow otherwise.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
