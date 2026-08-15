import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">Umeli</p>
          <p>A clearer record of property information on customary land.</p>
        </div>
        <div>
          <p className="footer-heading">Get started</p>
          <Link href="/properties">Find property</Link>
          <Link href="/sell">Sell a property</Link>
          <Link href="/account">Register or sign in</Link>
        </div>
        <div>
          <p className="footer-heading">Learn</p>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/about">About the programme</Link>
          <Link href="/help">Help and safety</Link>
        </div>
      </div>
      <div className="shell legal-footer">
        Umeli records submitted information and review steps. It does not
        determine ownership, title or legal validity.
      </div>
    </footer>
  );
}
