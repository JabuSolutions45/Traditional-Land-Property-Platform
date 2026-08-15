import { PageShell } from "@/components/page-shell";
export default function AboutPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="shell narrow">
          <p className="eyebrow">About the programme</p>
          <h1>Built with communities, not around them</h1>
          <p>
            Umeli is a proposed South African property-information platform for
            customary and traditional-land transactions.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell content-grid">
          <div>
            <h2>The purpose</h2>
            <p className="large-copy">
              Help people find places, submit property information, record
              review steps and begin buyer enquiries through a safer, auditable
              process.
            </p>
            <h2>The first pilot</h2>
            <p>
              The initial focus is Limpopo, beginning with Giyani, Malamulele
              and Venda, subject to participating communities and traditional
              authorities.
            </p>
          </div>
          <aside className="safety-card">
            <h2>What Umeli is not</h2>
            <ul>
              <li>Not a deeds registry</li>
              <li>Not a court or legal adviser</li>
              <li>Not proof of ownership or title</li>
              <li>Not an automatic approval system</li>
              <li>Not a holder of buyer funds</li>
            </ul>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
