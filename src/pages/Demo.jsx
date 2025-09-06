export default function Demo() {
  return (
    <section className="card">
      <h2 className="card-title">Live Demo</h2>
      <p className="muted">
        Connects to the ULI gateway in read-only demo mode. Coming soon: challenge/verify seals, plugin proposals,
        and engine pings.
      </p>
      <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
        <button className="btn small">Ping RIE</button>
        <button className="btn small">Ping LIE</button>
        <button className="btn small ghost">Request Challenge</button>
      </div>
    </section>
  );
}
