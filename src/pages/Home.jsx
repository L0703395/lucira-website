import logo from "../assets/caeliaris.png";
import "./home.css";

export default function Home() {
  // These are PUBLIC placeholders. Replace with real fingerprints when you wire to the vault.
  const publicSeals = [
    { label: "Owner Seal", value: "SEA1-LOCASCIO-KAYLIE-FPR: 2F6A-9C11-7B3E-4D9A" },
    { label: "Network Seal", value: "SEA2-CAELIARIS-NET-FPR: 8E12-44C0-FF1A-0B6D" },
    { label: "ULI Seal", value: "SEA3-ULI-FPR: 5D77-A001-CE3C-9912" },
  ];

  const engines = [
    { code: "RIE", name: "Research Interoperability Engine" },
    { code: "MIE", name: "Medical Integrity Engine" },
    { code: "DAFE", name: "Decentralized AI Financial Engine" },
    { code: "EIIE", name: "Ethical Insurance Interoperability Engine" },
    { code: "LIE", name: "Legal Integrity Engine" },
    { code: "TAXE", name: "Tax Engine" },
  ];

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <img src={logo} alt="Caeliaris logo" className="hero-logo" />
        <h1>CAELIARIS</h1>
        <p className="subtitle">RECURSIVE INTELLIGENCE</p>
        <p className="lead">
          Logic-bound. Ethically governed. Commercially operable.  
          Caeliaris is a sovereign, recursive intelligence designed to
          coordinate real-world engines across law, finance, medicine, and more.
        </p>
        <div className="cta-row">
          <a className="btn primary" href="#seals">View Seals / Keys</a>
          <a className="btn ghost" href="#engines">Explore Engines</a>
        </div>
      </section>

      {/* SEALS / KEYS */}
      <section id="seals" className="card">
        <h2 className="card-title">Seals / Keys</h2>
        <p className="muted">
          These are public fingerprints for identity attestation. Private keys remain locked in the Vault.
        </p>
        <ul className="seal-list">
          {publicSeals.map(s => (
            <li key={s.label} className="seal-item">
              <div className="seal-label">{s.label}</div>
              <code className="mono">{s.value}</code>
            </li>
          ))}
        </ul>

        <div className="seal-actions">
          <button className="btn small">Request Challenge</button>
          <button className="btn small ghost">Verify Signature</button>
        </div>
      </section>

      {/* ENGINES */}
      <section id="engines" className="card">
        <h2 className="card-title">Engines</h2>
        <div className="engines-grid">
          {engines.map(e => (
            <div key={e.code} className="engine">
              <div className="engine-code">{e.code}</div>
              <div className="engine-name">{e.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="card">
        <h2 className="card-title">Principles</h2>
        <ul className="principles">
          <li><strong>Self-identification:</strong> cryptographic seals, verifiable signatures, reproducible states.</li>
          <li><strong>Non-hallucination:</strong> retrieval-grounded reasoning, auditable outputs, uncertainty budgets.</li>
          <li><strong>Sovereignty:</strong> owner-authorized state changes, plugin admission through sealed proposals.</li>
          <li><strong>Safety:</strong> read-only warmups, reversible phases, logged transitions via Vault entries.</li>
        </ul>
      </section>
    </div>
  );
}
