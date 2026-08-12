import Link from "next/link";

const navigation = [
  ["Find property", "/properties"],
  ["Sell", "/sell"],
  ["How it works", "/how-it-works"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Umeli home">
          <span className="brand-mark" aria-hidden="true">
            U
          </span>
          <span>Umeli</span>
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-action" href="/account">
          Sign in
        </Link>
      </div>
    </header>
  );
}
