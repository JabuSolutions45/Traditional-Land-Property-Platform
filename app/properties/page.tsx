import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const areas = [
  {
    id: "limpopo",
    name: "Greater Giyani",
    detail: "Local municipality · Mopani · Limpopo",
    places: "Homu, Siyandhani, Giyani and surrounding villages",
  },
  {
    id: "limpopo",
    name: "Malamulele",
    detail: "Collins Chabane · Vhembe · Limpopo",
    places: "Mhinga, Malamulele and surrounding villages",
  },
  {
    id: "limpopo",
    name: "Thohoyandou",
    detail: "Thulamela · Vhembe · Limpopo",
    places: "Venda regional centre and surrounding villages",
  },
  {
    id: "gauteng",
    name: "Diepsloot",
    detail: "City of Johannesburg · Gauteng",
    places: "Wards and recognised sub-areas shown where available",
  },
] as const;

export default function PropertiesPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="shell narrow">
          <p className="eyebrow">Find property</p>
          <h1>Start with the area you know</h1>
          <p>
            Search will use villages, towns, wards, municipalities, alternative
            names and traditional-authority areas without forcing them into one
            hierarchy.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell narrow">
          <div className="preview-notice" role="note">
            <strong>Directory preview</strong>
            <span>
              Live property listings are not open yet. Review the area-search
              structure prepared for the pilot.
            </span>
          </div>
          <div className="area-list">
            {areas.map((area, index) => (
              <article id={area.id} key={`${area.name}-${index}`}>
                <div>
                  <span className="result-type">Area</span>
                  <h2>{area.name}</h2>
                  <p>{area.detail}</p>
                  <small>{area.places}</small>
                </div>
                <Link href="/account">Notify me when listings open</Link>
              </article>
            ))}
          </div>
          <div className="empty-help">
            <h2>Cannot find your village?</h2>
            <p>
              Community corrections will be reviewed against source records. A
              user suggestion will not silently replace official or historical
              data.
            </p>
            <Link className="button button-primary" href="/help">
              Learn about corrections
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
