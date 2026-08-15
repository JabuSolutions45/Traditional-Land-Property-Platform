import { PageShell } from "@/components/page-shell";

export default function AccountPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="shell narrow">
          <p className="eyebrow">Register or sign in</p>
          <h1>Mobile-first access is coming with the pilot</h1>
          <p>
            You will use a mobile number and a one-time SMS code. An email
            address will not be required.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell narrow">
          <div className="preview-notice" role="status">
            <strong>Registration is not open yet</strong>
            <span>
              This review site does not collect your phone number or personal
              information. Secure account access will open only after database
              permissions and privacy controls pass testing.
            </span>
          </div>
          <div className="assurance-grid">
            <article>
              <span>1</span>
              <h2>Enter mobile number</h2>
              <p>Use a South African mobile number that you control.</p>
            </article>
            <article>
              <span>2</span>
              <h2>Receive SMS code</h2>
              <p>A short-lived code confirms access to the number.</p>
            </article>
            <article>
              <span>3</span>
              <h2>Create your profile</h2>
              <p>Add only the information needed for the service you choose.</p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
