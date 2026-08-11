const principles = [
  "Mobile-first and usable on slow connections",
  "Clear records of what was checked and by whom",
  "Municipal and traditional geography kept distinct",
  "No claim to determine ownership or legal title",
] as const;

const firstServices = [
  {
    title: "Find the right area",
    description:
      "Search by village, town or municipality when the national directory opens.",
    status: "Location directory being prepared",
  },
  {
    title: "Understand the checks",
    description:
      "See exactly what information was supplied, reviewed or still needs attention.",
    status: "Plain-language process",
  },
  {
    title: "Follow the Limpopo pilot",
    description:
      "The first planned pilot focuses on Giyani, Malamulele and Venda.",
    status: "Pilot preparation",
  },
] as const;

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="shell">
          <p className="eyebrow">South African property information</p>
          <h1 id="page-title">
            A clearer path for property information on customary land.
          </h1>
          <p className="intro">
            Umeli is being designed to help communities record locations,
            supporting information and review decisions in a secure, auditable
            way.
          </p>
          <div className="notice" role="note">
            Umeli records submitted information and review steps. It does not
            determine ownership, title or legal validity.
          </div>
          <a className="primary-link" href="#first-services">
            See what Umeli will offer
          </a>
        </div>
      </section>

      <section
        className="services"
        id="first-services"
        aria-labelledby="services-title"
      >
        <div className="shell">
          <p className="eyebrow">First services</p>
          <h2 id="services-title">Start with one clear need</h2>
          <p className="section-intro">
            Umeli is being introduced in small, understandable steps. No
            account or personal information is required on this page.
          </p>
          <ul className="service-list">
            {firstServices.map((service, index) => (
              <li key={service.title}>
                <span className="service-number" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="status">{service.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="shell">
          <p className="eyebrow">Foundation principles</p>
          <h2 id="principles-title">Built for trust through clarity</h2>
          <ul>
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
          <p className="closing-note">
            Important decisions will remain reviewable by people. Umeli will
            not use artificial intelligence to approve a property or make a
            legal conclusion.
          </p>
        </div>
      </section>
    </main>
  );
}
