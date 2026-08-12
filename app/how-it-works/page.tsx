import { PageShell } from "@/components/page-shell";

const checks = [
  "Mobile number confirmed",
  "Identity information submitted",
  "Property location supplied",
  "Supporting document reviewed",
  "Community confirmation received",
  "Traditional authority review pending",
  "Traditional authority confirmed",
  "Site visit completed",
];
export default function HowPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="shell narrow">
          <p className="eyebrow">How it works</p>
          <h1>Show exactly what was checked</h1>
          <p>
            One vague “verified” label can mislead people. Umeli will record
            each check, who performed it, when it happened and what it does not
            prove.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">Descriptive statuses</p>
            <h2>Clear words, backed by records</h2>
            <div className="badge-list">
              {checks.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </div>
          <aside className="safety-card">
            <h2>Separate geographic systems</h2>
            <p>
              A village may belong to a ward, municipality, main place,
              traditional-authority area and postal area at the same time.
            </p>
            <p>
              Umeli keeps these links distinct. A municipal boundary does not
              automatically define a traditional-authority boundary.
            </p>
          </aside>
        </div>
      </section>
      <section className="section steps-section">
        <div className="shell narrow">
          <h2>Human review remains possible</h2>
          <p className="large-copy">
            Platform reviewers, community verifiers and authorised
            traditional-authority representatives will have defined roles.
            Decisions and corrections will remain in an auditable history.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
