import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const sellerSteps = [
  "Confirm your mobile number",
  "Choose the property area",
  "Describe the property and local reference",
  "Add photographs and permitted documents",
  "Submit identity information privately",
  "Follow platform and authority review statuses",
];

export default function SellPage() {
  return (
    <PageShell>
      <section className="page-hero seller-hero">
        <div className="shell narrow">
          <p className="eyebrow">Sell a property</p>
          <h1>Prepare once. Follow every step.</h1>
          <p>
            Umeli will guide sellers through a clear record of the information
            supplied and the reviews completed.
          </p>
          <Link className="button button-primary" href="/account">
            Register for the pilot
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">Seller journey</p>
            <h2>What you will need to do</h2>
            <ol className="numbered-list">
              {sellerSteps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <aside className="safety-card">
            <h2>Before you begin</h2>
            <ul>
              <li>A mobile number will be enough to create an account.</li>
              <li>You may not have a title deed or formal street address.</li>
              <li>
                Your exact coordinates and identity documents will not be
                public.
              </li>
              <li>No seller can approve their own listing.</li>
            </ul>
            <p>
              <strong>
                Umeli does not prove that a seller owns a property or has a
                legal right to transfer it.
              </strong>
            </p>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
