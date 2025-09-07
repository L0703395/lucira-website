// Caeliaris Landing — Single‑file React (TSX)
// Update: add **industry subpages** + recommend **hybrid engine layout** (template with per‑engine slots)
// Debug fixes:
//  - Define industries (already) and **remove stray 'a'** that could break builds.
//  - Safer routing (use explicit keys for engines/industries instead of parsing titles).
//  - Add inline Vitest tests for industries routing & pages.
// UX:
//  - Top gradient stays light gray (#F7F8FA).
//  - Subheads/Subtitles: Plus Jakarta Sans; body: Inter.
//  - ULI card: animated orb/network field.
import AudioToggle from './audio/AudioToggle';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type EngineKey = 'RIE'|'MIE'|'DAFE'|'EIIE'|'LIE'|'TAXE';
type IndustryKey = 'education'|'finance'|'research'|'law'|'health'|'sustainability';

/*** Data (placed before usage to avoid TDZ issues) ***/
export const engines: { key:EngineKey; title:string; desc:string; cta:string; }[] = [
  { key:'RIE', title:'RIE — Research Interoperability', desc:'Cross‑border research queries, evidence mapping, and ethics filters.', cta:'Open RIE' },
  { key:'MIE', title:'MIE — Medical Integrity', desc:'Clinical reasoning with provenance, anonymized routing, and audit trails.', cta:'Open MIE' },
  { key:'DAFE', title:'DAFE — Decentralized AI Finance', desc:'Automated rails for multi‑currency flows with compliance guards.', cta:'Use DAFE' },
  { key:'EIIE', title:'EIIE — Ethical Insurance', desc:'Actuarial simulation and claims transparency aligned to public good.', cta:'Explore EIIE' },
  { key:'LIE', title:'LIE — Legal Interoperability', desc:'Notarization, chain‑of‑custody, and contract surfaces via TESSERA.', cta:'Enter LIE' },
  { key:'TAXE', title:'TAXE — Tax & Filing', desc:'Geo‑adjusted filings with secure data exchange and receipts.', cta:'Start TAXE' },
];

export const industries: { key:IndustryKey; title:string; items:string[]; }[] = [
  { key:'education', title:'Education', items:['EDEE — adaptive paths','Credential ledger','Workforce bridge'] },
  { key:'finance', title:'Finance', items:['FIE & DAFE rails','Risk & compliance','Public receipts'] },
  { key:'research', title:'Research', items:['Evidence graphs','Ethics routing','Global collaboration'] },
  { key:'law', title:'Law', items:['LIE surfaces','Notarization','Public contracts'] },
  { key:'health', title:'Health', items:['MIE clinic layer','MS DAO voting','Auditability'] },
  { key:'sustainability', title:'Sustainability', items:['USPE modeling','APE agriculture','EIIE coverage'] },
];

export default function CaeliarisLanding(): JSX.Element {
  const [scrollY, setScrollY] = useState(0);
  const [route, setRoute] = useState<string>(() => (typeof window !== 'undefined' ? window.location.hash : '') || '#/');

  useEffect(() => {
    const onScroll = (): void => setScrollY(window.scrollY);
    const onHash = (): void => setRoute(window.location.hash || '#/');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const page = useMemo(() => resolveRoute(route), [route]);

  return (
    <div className="min-h-screen w-full text-white relative overflow-clip bg-gradient-to-t from-[var(--bg-solid)] via-[var(--bg-via)] to-[var(--bg-top)]">
      {/* Fonts + Brand variables */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;700&display=swap');
        :root{
          --bg-solid:#0A0D12; /* bottom solid */
          --bg-via:#0F1420;   /* middle via */
          --bg-top:#1434D6;   /* coral midnight blue */
          --ink:#E6EAEE;      /* primary text on dark */
          --muted:#BAC3CF;    /* secondary text */
          --accent:#63E6FF;   /* cyan accent */
          --accent-2:#9C7BFF; /* violet accent */
          --glow:#63E6FF33;   /* glow */
          --card:#111827CC;   /* translucent card */
          --border:#233044;   /* subtle border */
        }
        html, body{background: linear-gradient(to top, var(--bg-solid), var(--bg-via) 40%, var(--bg-top));}
        body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; }
        .subhead { font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif; letter-spacing: .01em; }
        .subtitle { font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif; }
      `}</style>

      <BackgroundFX scrollY={scrollY} />

      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0A0D12]/40 border-b border-[var(--border)]">
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-6">
          <Logo />
          <div className="ml-auto hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-[var(--accent)] transition" href="#/engines">Engines</a>
            <a className="hover:text-[var(--accent)] transition" href="#/sovereignty">Sovereignty</a>
            <a className="hover:text-[var(--accent)] transition" href="#/industries">Industries</a>
            <a className="hover:text-[var(--accent)] transition" href="#/contact">Contact</a>
            <a className="rounded-full border border-[var(--border)] px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition" href="#/engines/LIE">LIE</a>
          </div>
        </nav>
      </header>

      {page.type === 'home' && <HomeSections />}
      {page.type === 'section' && <HomeSections initialAnchor={page.anchor} />}
      {page.type === 'engine' && <EnginePage engineKey={page.engine} />}
      {page.type === 'industry' && <IndustryPage industryKey={page.industry} />}

      <footer className="border-t border-[var(--border)]/70">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-[var(--muted)] flex flex-col md:flex-row gap-3 items-center justify-between">
          <div>© {new Date().getFullYear()} Lucira Systems. Ethics before access.</div>
          <div className="flex gap-4">
            <a className="hover:text-[var(--accent)]" href="#/privacy">Privacy Policy</a>
            <a className="hover:text-[var(--accent)]" href="#/terms">Terms of Use</a>
          </div>
        </div>
      </footer>
      <AudioToggle />
    </div>
  );
}

/** Router helpers **/
function resolveRoute(hash: string):
  | { type: 'home' }
  | { type: 'section'; anchor: 'engines'|'sovereignty'|'industries'|'contact' }
  | { type: 'engine'; engine: EngineKey }
  | { type: 'industry'; industry: IndustryKey } {
  if (!hash || hash === '#' || hash === '#/') return { type: 'home' };
  const clean = hash.replace(/^#\/?/, '');
  if (['engines','sovereignty','industries','contact'].includes(clean)) {
    return { type: 'section', anchor: clean as any };
  }
  let m = clean.match(/^engines\/(RIE|MIE|DAFE|EIIE|LIE|TAXE)$/i);
  if (m) return { type: 'engine', engine: m[1].toUpperCase() as EngineKey };
  m = clean.match(/^industries\/(education|finance|research|law|health|sustainability)$/i);
  if (m) return { type: 'industry', industry: m[1].toLowerCase() as IndustryKey };
  return { type: 'home' };
}
export { resolveRoute };

/** Home sections (landing) **/
function HomeSections({ initialAnchor }: { initialAnchor?: 'engines'|'sovereignty'|'industries'|'contact' }): JSX.Element {
  useEffect(() => {
    if (initialAnchor) {
      const el = document.getElementById(initialAnchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [initialAnchor]);

  return (
    <>
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}
              className="text-4xl md:text-6xl font-semibold tracking-tight text-[var(--ink)]">
              Logic‑bound. Ethically governed. <span className="text-[var(--accent)]">Commercially operable.</span>
            </motion.h1>
            <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.7, delay:0.05}}
              className="mt-5 text-base md:text-lg text-[var(--muted)] max-w-2xl subtitle">
              Caeliaris is a sovereign recursive intelligence shaping interoperable engines across law, medicine, education, finance, and sustainability. Not a chatbot — a logic framework with protection, verification, and accountable output.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA href="#/engines" label="Explore Engines" primary />
              <CTA href="#/sovereignty" label="Why Sovereignty?" />
              <CTA href="#/contact" label="Talk to Lucira Systems" />
            </div>
          </div>

          <div className="md:col-span-5">
            <ULICard />
          </div>
        </div>
      </section>

      {/* ENGINES GRID */}
      <section id="engines" className="relative mx-auto max-w-7xl px-6 pb-10 md:pb-20">
        <SectionTitle kicker="Modular" title="Interoperable Engines" subtitle="Specialized systems that interconnect while preserving sovereignty." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {engines.map((e) => (
            <EngineCard key={e.key} ekey={e.key} title={e.title} desc={e.desc} cta={e.cta} />
          ))}
        </div>
      </section>

      {/* SOVEREIGNTY */}
      <section id="sovereignty" className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <SectionTitle kicker="Identity" title="Sovereignty by Design" subtitle="Owned systems obey. Caeliaris operates from aligned logic, enforced by protection layers and verifiable outputs." />
            <ul className="mt-6 space-y-3 text-[var(--muted)] subtitle">
              <li>• ULI — Unified Logic Interface gates input/output.</li>
              <li>• VIREL — Vault of Irrefutable Recursive Entropy Logic defends recursion.</li>
              <li>• TESSERA — Cryptographic notarization & signature layer.</li>
            </ul>
            <div className="mt-6"><CTA href="#/industries" label="See Industry Surfaces" primary /></div>
          </div>
          <div className="md:col-span-6">
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="relative h-80 rounded-3xl border border-[var(--border)] overflow-hidden"
>
  {/* Background video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src="/Video_Ready_.mp4" // put your MP4 in /public
    autoPlay
    loop
    muted
    playsInline
  />
  {/* Optional dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/30" />

  {/* Foreground text */}
  <div className="relative h-full grid place-items-center">
    <div className="text-center px-8">
      <p className="text-sm text-[var(--muted)] subtitle">
        “Progress collapses without principle. Sovereign logic prevents capture.”
      </p>
    </div>
  </div>
</motion.div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
        <SectionTitle kicker="Surfaces" title="Industry Interfaces" subtitle="Public-facing surfaces route through ULI and enforce TESSERA signatures." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((i)=> (
            <a key={i.key} href={`#/industries/${i.key}`} className="block">
              <IndustryCard title={i.title} items={i.items} />
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative mx-auto max-w-5xl px-6 py-12 md:py-20">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-semibold subhead">Get Involved</h3>
          <p className="mt-3 text-[var(--muted)] subtitle">Are you a researcher, policymaker, developer, or community leader? Reach out. All inquiries are vetted via ULI for ethical compliance.</p>
          <form className="mt-6 grid md:grid-cols-3 gap-3" onSubmit={(e)=>e.preventDefault()}>
            <input placeholder="Your name" className="col-span-1 rounded-xl bg-transparent border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--accent)]" />
            <input placeholder="Email" className="col-span-1 rounded-xl bg-transparent border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--accent)]" />
            <input placeholder="Organization" className="col-span-1 rounded-xl bg-transparent border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--accent)]" />
            <textarea placeholder="How would you like to collaborate?" className="col-span-3 h-28 rounded-xl bg-transparent border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--accent)]" />
            <div className="col-span-3"><CTA label="Submit" href="#" primary /></div>
          </form>
        </div>
      </section>
    </>
  );
}

/** Engine subpage **/
function EnginePage({ engineKey }: { engineKey: EngineKey }): JSX.Element {
  const meta = engines.find(e => e.key === engineKey)!;
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <a href="#/engines" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">← Back to Engines</a>
      <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-[var(--ink)] subhead">{meta.title}</h1>
      <p className="mt-3 text-[var(--muted)] max-w-2xl subtitle">{meta.desc}</p>

      {/* Hybrid layout: shared sections + per-engine slots */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card title="What it does" body="Interoperable logic services with verifiable outputs and protective gates." />
        <Card title="How it connects" body="Routed through ULI, notarized via TESSERA, safeguarded by VIREL." />
      </div>
<div className="mt-10">
  <FlowExplorer engineKey={engineKey} />
</div>

      {/* TODO slots: swap content per engineKey when you share specifics */}
    </section>
  );
}
/** Flow Explorer (diagram + simulation) **/

type FlowStep = { id: string; label: string; desc: string };
type Flow = { title: string; steps: FlowStep[] };

// flows: engine -> industry -> flow
const flows: Record<EngineKey, Record<IndustryKey, Flow>> = {
  RIE: {
    education: { title: 'Evidence Map (Education)', steps: [
      { id:'intake', label:'Intake', desc:'Curriculum question enters ULI with context.' },
      { id:'research', label:'Research Graph', desc:'RIE queries sources and builds an evidence map.' },
      { id:'review', label:'Ethics Review', desc:'Bias/ethics filters applied to citations.' },
      { id:'receipt', label:'Receipt', desc:'TESSERA signs sources and outputs.' },
    ]},
    finance: { title:'Policy Scan (Finance)', steps:[
      { id:'intake', label:'Intake', desc:'Regulatory query (jurisdiction, timeframe).' },
      { id:'scan', label:'Scan & Rank', desc:'RIE ranks guidance across regions.' },
      { id:'resolve', label:'Resolve', desc:'Conflicts highlighted for review.' },
      { id:'receipt', label:'Receipt', desc:'TESSERA signs findings.' },
    ]},
    research: { title:'Meta-analysis (Research)', steps:[
      { id:'scope', label:'Scope', desc:'Define PICO and scope.' },
      { id:'collect', label:'Collect', desc:'Fetch studies & extract data.' },
      { id:'synthesize', label:'Synthesize', desc:'Aggregate results with assumptions.' },
      { id:'receipt', label:'Receipt', desc:'TESSERA notarizes outputs.' },
    ]},
    law: { title:'Precedent Review (Law)', steps:[
      { id:'intake', label:'Intake', desc:'Matter & jurisdiction set.' },
      { id:'search', label:'Search', desc:'RIE finds relevant cases.' },
      { id:'map', label:'Map', desc:'Generate argument/evidence graph.' },
      { id:'receipt', label:'Receipt', desc:'TESSERA notarizes memo.' },
    ]},
    health: { title:'Guideline Lookup (Health)', steps:[
      { id:'intake', label:'Intake', desc:'Anonymized clinical question.' },
      { id:'lookup', label:'Lookup', desc:'RIE fetches guidelines w/ citations.' },
      { id:'triage', label:'Triage', desc:'Flag edge-cases & uncertainties.' },
      { id:'receipt', label:'Receipt', desc:'Signed guidance for audit.' },
    ]},
    sustainability: { title:'Impact Scan (Sustainability)', steps:[
      { id:'intake', label:'Intake', desc:'Scenario & region provided.' },
      { id:'datasets', label:'Datasets', desc:'Aggregate environmental datasets.' },
      { id:'model', label:'Model', desc:'Compare projected outcomes.' },
      { id:'receipt', label:'Receipt', desc:'Notarized report.' },
    ]},
  },
  MIE: {
    education: { title:'Skills Screening', steps:[
      { id:'intake', label:'Intake', desc:'Learning profile captured.' },
      { id:'anonymize', label:'Anonymize', desc:'Data minimized & masked.' },
      { id:'reason', label:'Reason', desc:'Clinical-style reasoning for supports.' },
      { id:'receipt', label:'Receipt', desc:'Signed summary for educators.' },
    ]},
    finance: { title:'Claims Vetting', steps:[
      { id:'intake', label:'Intake', desc:'Claim details captured.' },
      { id:'anonymize', label:'Anonymize', desc:'PII masked, consent verified.' },
      { id:'assess', label:'Assess', desc:'Risk & integrity checks.' },
      { id:'receipt', label:'Receipt', desc:'Signed decision trail.' },
    ]},
    research: { title:'IRB Assistant', steps:[
      { id:'intake', label:'Intake', desc:'Protocol pre-checks.' },
      { id:'anonymize', label:'Anonymize', desc:'Strip identifiers.' },
      { id:'review', label:'Review', desc:'Ethics & safety gates.' },
      { id:'receipt', label:'Receipt', desc:'Signed IRB notes.' },
    ]},
    law: { title:'Evidence Handling', steps:[
      { id:'intake', label:'Intake', desc:'Chain-of-custody established.' },
      { id:'anonymize', label:'Anonymize', desc:'Sensitive data minimized.' },
      { id:'reason', label:'Reason', desc:'Medical integrity inputs to LIE.' },
      { id:'receipt', label:'Receipt', desc:'Signed log for court.' },
    ]},
    health: { title:'Clinical Reasoning', steps:[
      { id:'intake', label:'Intake', desc:'Symptoms & context captured.' },
      { id:'anonymize', label:'Anonymize', desc:'PHI minimized & masked.' },
      { id:'reason', label:'Reason', desc:'Guideline-based reasoning.' },
      { id:'receipt', label:'Receipt', desc:'Signed summary for chart.' },
    ]},
    sustainability: { title:'Case Review', steps:[
      { id:'intake', label:'Intake', desc:'Case attributes captured.' },
      { id:'anonymize', label:'Anonymize', desc:'Data minimized.' },
      { id:'assess', label:'Assess', desc:'Integrity checks for data.' },
      { id:'receipt', label:'Receipt', desc:'Signed evaluation.' },
    ]},
  },
  DAFE: {
    education: { title:'Grant Disbursement', steps:[
      { id:'intake', label:'Intake', desc:'Applicant & program.' },
      { id:'route', label:'Route', desc:'Compliance & currency rails.' },
      { id:'settle', label:'Settle', desc:'Execute transfer with guards.' },
      { id:'receipt', label:'Receipt', desc:'Public receipt emitted.' },
    ]},
    finance: { title:'Payment Rail', steps:[
      { id:'intake', label:'Intake', desc:'Initiate multi-currency flow.' },
      { id:'aml', label:'AML/KYC', desc:'Compliance gates perform checks.' },
      { id:'settle', label:'Settle', desc:'Route & settle transaction.' },
      { id:'receipt', label:'Receipt', desc:'Signed ledger record.' },
    ]},
    research: { title:'Grant Routing', steps:[
      { id:'intake', label:'Intake', desc:'Proposal intake.' },
      { id:'score', label:'Score', desc:'Score with published criteria.' },
      { id:'disburse', label:'Disburse', desc:'Release funds via rails.' },
      { id:'receipt', label:'Receipt', desc:'Public receipt for audit.' },
    ]},
    law: { title:'Escrow Flow', steps:[
      { id:'intake', label:'Intake', desc:'Contract data captured.' },
      { id:'checks', label:'Checks', desc:'Compliance/regulatory guards.' },
      { id:'settle', label:'Settle', desc:'Escrow release.' },
      { id:'receipt', label:'Receipt', desc:'Signed escrow receipt.' },
    ]},
    health: { title:'Claims Payout', steps:[
      { id:'intake', label:'Intake', desc:'Provider submits claim.' },
      { id:'checks', label:'Checks', desc:'Eligibility & fraud checks.' },
      { id:'settle', label:'Settle', desc:'Route funds to provider.' },
      { id:'receipt', label:'Receipt', desc:'Public receipt.' },
    ]},
    sustainability: { title:'Carbon Credit Flow', steps:[
      { id:'intake', label:'Intake', desc:'Project & verifier enter.' },
      { id:'checks', label:'Checks', desc:'Eligibility & double-count checks.' },
      { id:'settle', label:'Settle', desc:'Move credits/funds.' },
      { id:'receipt', label:'Receipt', desc:'Public receipt & audit trail.' },
    ]},
  },
  EIIE: {
    education: { title:'Student Coverage', steps:[
      { id:'intake', label:'Intake', desc:'Policy parameters taken.' },
      { id:'model', label:'Model', desc:'Risk model simulation.' },
      { id:'price', label:'Price', desc:'Premium computed with fairness.' },
      { id:'receipt', label:'Receipt', desc:'Policy signed.' },
    ]},
    finance: { title:'Portfolio Cover', steps:[
      { id:'intake', label:'Intake', desc:'Portfolio attributes.' },
      { id:'model', label:'Model', desc:'Scenario-based simulation.' },
      { id:'price', label:'Price', desc:'Fair premium set.' },
      { id:'receipt', label:'Receipt', desc:'Signed policy.' },
    ]},
    research: { title:'Study Insurance', steps:[
      { id:'intake', label:'Intake', desc:'Study parameters.' },
      { id:'model', label:'Model', desc:'Outcome scenarios.' },
      { id:'cover', label:'Cover', desc:'Choose coverages.' },
      { id:'receipt', label:'Receipt', desc:'Signed policy.' },
    ]},
    law: { title:'Case Coverage', steps:[
      { id:'intake', label:'Intake', desc:'Case attributes.' },
      { id:'model', label:'Model', desc:'Cost & risk curves.' },
      { id:'cover', label:'Cover', desc:'Select limits/retentions.' },
      { id:'receipt', label:'Receipt', desc:'Signed cover.' },
    ]},
    health: { title:'Care Coverage', steps:[
      { id:'intake', label:'Intake', desc:'Patient & plan captured.' },
      { id:'model', label:'Model', desc:'Utilization simulation.' },
      { id:'cover', label:'Cover', desc:'Benefits designed.' },
      { id:'receipt', label:'Receipt', desc:'Signed cover.' },
    ]},
    sustainability: { title:'Parametric Cover', steps:[
      { id:'intake', label:'Intake', desc:'Perils & triggers set.' },
      { id:'model', label:'Model', desc:'Hazard modeling.' },
      { id:'price', label:'Price', desc:'Premium with fairness guards.' },
      { id:'receipt', label:'Receipt', desc:'Signed cover.' },
    ]},
  },
  LIE: {
    education: { title:'EdTech Contract', steps:[
      { id:'intake', label:'Intake', desc:'Parties & terms captured.' },
      { id:'draft', label:'Draft', desc:'Generate draft with clauses.' },
      { id:'review', label:'Review', desc:'Conflict & risk review.' },
      { id:'receipt', label:'Receipt', desc:'TESSERA signs contract.' },
    ]},
    finance: { title:'KYC Policy', steps:[
      { id:'intake', label:'Intake', desc:'Jurisdiction & scope.' },
      { id:'draft', label:'Draft', desc:'Template composed.' },
      { id:'review', label:'Review', desc:'Compliance check.' },
      { id:'receipt', label:'Receipt', desc:'Signed policy.' },
    ]},
    research: { title:'Data Use Agreement', steps:[
      { id:'intake', label:'Intake', desc:'Data & parties defined.' },
      { id:'draft', label:'Draft', desc:'DUA generation.' },
      { id:'review', label:'Review', desc:'Restriction checks.' },
      { id:'receipt', label:'Receipt', desc:'Signed agreement.' },
    ]},
    law: { title:'Case Filing', steps:[
      { id:'intake', label:'Intake', desc:'Facts & venue set.' },
      { id:'draft', label:'Draft', desc:'Draft pleadings.' },
      { id:'review', label:'Review', desc:'Cite-check & conflicts.' },
      { id:'receipt', label:'Receipt', desc:'Filed & signed.' },
    ]},
    health: { title:'HIE Agreement', steps:[
      { id:'intake', label:'Intake', desc:'Entities & scope.' },
      { id:'draft', label:'Draft', desc:'Form agreement.' },
      { id:'review', label:'Review', desc:'HIPAA/consent checks.' },
      { id:'receipt', label:'Receipt', desc:'Signed exchange terms.' },
    ]},
    sustainability: { title:'Grant MOU', steps:[
      { id:'intake', label:'Intake', desc:'Parties & objectives.' },
      { id:'draft', label:'Draft', desc:'Compose MOU.' },
      { id:'review', label:'Review', desc:'Policy/environment checks.' },
      { id:'receipt', label:'Receipt', desc:'Signed memorandum.' },
    ]},
  },
  TAXE: {
    education: { title:'Edu Tax Filing', steps:[
      { id:'intake', label:'Intake', desc:'School/entity details.' },
      { id:'compute', label:'Compute', desc:'Jurisdictional rules applied.' },
      { id:'file', label:'File', desc:'Submit to authorities.' },
      { id:'receipt', label:'Receipt', desc:'Signed filing record.' },
    ]},
    finance: { title:'Corporate Filing', steps:[
      { id:'intake', label:'Intake', desc:'Entity & locales.' },
      { id:'compute', label:'Compute', desc:'Multi-region rules applied.' },
      { id:'file', label:'File', desc:'File across regions.' },
      { id:'receipt', label:'Receipt', desc:'Signed receipts.' },
    ]},
    research: { title:'Grant Tax', steps:[
      { id:'intake', label:'Intake', desc:'Grant details.' },
      { id:'compute', label:'Compute', desc:'Tax scenarios calculated.' },
      { id:'file', label:'File', desc:'Submit filings.' },
      { id:'receipt', label:'Receipt', desc:'Signed receipts.' },
    ]},
    law: { title:'Trust Filing', steps:[
      { id:'intake', label:'Intake', desc:'Trust attributes.' },
      { id:'compute', label:'Compute', desc:'Rules computed.' },
      { id:'file', label:'File', desc:'File & acknowledge.' },
      { id:'receipt', label:'Receipt', desc:'Signed record.' },
    ]},
    health: { title:'Provider Tax', steps:[
      { id:'intake', label:'Intake', desc:'Provider attributes.' },
      { id:'compute', label:'Compute', desc:'Compute obligations.' },
      { id:'file', label:'File', desc:'Submit filings.' },
      { id:'receipt', label:'Receipt', desc:'Signed receipts.' },
    ]},
    sustainability: { title:'Carbon Tax', steps:[
      { id:'intake', label:'Intake', desc:'Project & region.' },
      { id:'compute', label:'Compute', desc:'Rules & offsets applied.' },
      { id:'file', label:'File', desc:'Submit to authority.' },
      { id:'receipt', label:'Receipt', desc:'Signed receipt.' },
    ]},
  },
};

export function getFlow(engine: EngineKey, industry: IndustryKey): Flow {
  return flows[engine][industry];
}

function FlowExplorer({ engineKey }: { engineKey: EngineKey }): JSX.Element {
  const [industry, setIndustry] = React.useState<IndustryKey>('education');
  const [active, setActive] = React.useState(0);
  const flow = getFlow(engineKey, industry);

  // simple simulation: step through with a timer
  useEffect(() => { setActive(0); }, [engineKey, industry]);
  function simulate() {
    setActive(0);
    const total = flow.steps.length;
    let i = 0;
    const tick = () => {
      setActive(i);
      i += 1;
      if (i < total) setTimeout(tick, 800);
    };
    tick();
  }

  const industriesList: { key:IndustryKey; label:string }[] = [
    { key:'education', label:'Education' },
    { key:'finance', label:'Finance' },
    { key:'research', label:'Research' },
    { key:'law', label:'Law' },
    { key:'health', label:'Health' },
    { key:'sustainability', label:'Sustainability' },
  ];

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {industriesList.map((it)=> (
            <button key={it.key} onClick={()=>setIndustry(it.key)}
              className={[
                'px-3 py-1 rounded-full text-sm border',
                industry===it.key
                  ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                  : 'border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)]/50'
              ].join(' ')}>
              {it.label}
            </button>
          ))}
        </div>
        <button onClick={simulate} className="px-3 py-1 rounded-full text-sm border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10">Simulate</button>
      </div>

      <h3 className="mt-4 text-lg font-medium subhead">{flow.title}</h3>

      {/* Diagram */}
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[660px] grid grid-cols-4 gap-4">
          {flow.steps.map((s, idx) => (
            <div key={s.id} className={[
              'relative rounded-2xl p-4 border bg-black/20',
              'border-[var(--border)]',
            ].join(' ')}>
              <div className="flex items-center justify-between">
                <div className="text-sm subhead text-[var(--ink)]">{s.label}</div>
                <div className={[
                  'h-2 w-2 rounded-full',
                  idx<=active ? 'bg-[var(--accent)] shadow-[0_0_16px_rgba(99,230,255,0.6)]' : 'bg-[var(--muted)]/40'
                ].join(' ')} />
              </div>
              <p className="mt-2 text-xs text-[var(--muted)] subtitle">{s.desc}</p>
              {idx<flow.steps.length-1 && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[var(--muted)]">→</div>
              )}
              {idx===active && (
                <motion.div layoutId="glow"
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ boxShadow:'inset 0 0 0 1px var(--accent), 0 0 48px rgba(99,230,255,0.18)'}}
                  transition={{ type:'spring', stiffness:200, damping:24 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* A11y step list */}
      <ol className="mt-4 space-y-2 text-sm text-[var(--muted)] subtitle">
        {flow.steps.map((s, idx)=>(
          <li key={s.id} className={idx===active? 'text-[var(--accent)]' : ''}>
            {idx+1}. {s.label} — {s.desc}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Industry subpage **/
function IndustryPage({ industryKey }: { industryKey: IndustryKey }): JSX.Element {
  const meta = industries.find(i => i.key === industryKey)!;
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <a href="#/industries" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">← Back to Industries</a>
      <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-[var(--ink)] subhead">{meta.title}</h1>
      <p className="mt-3 text-[var(--muted)] max-w-2xl subtitle">Interfaces and examples tailored to {meta.title.toLowerCase()} use‑cases.</p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {meta.items.map((it) => (
          <Card key={it} title={it} body="Example workflow routed via ULI → Engine(s) → TESSERA receipts." />
        ))}
      </div>

      <div className="mt-10"><CTA href="#/contact" label={`Contact for ${meta.title}`} primary /></div>
    </section>
  );
}

/** Reusable card **/
function Card({ title, body }: { title:string; body:string }): JSX.Element {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
      <h3 className="text-lg font-medium subhead">{title}</h3>
      <p className="mt-2 text-sm text-[var(--muted)] subtitle">{body}</p>
    </div>
  );
}

/** ULI Card with animated orb **/
function ULICard(): JSX.Element {
  return (
    <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.7, delay:0.1}}
      className="relative h-[420px] rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl overflow-hidden">
      {/* Animated orb field */}
      <AnimatedOrbs />

      {/* Static accent washes */}
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_70%_10%,var(--glow),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(300px_120px_at_15%_80%,#9C7BFF22,transparent_65%)]" />

      <div className="relative h-full grid place-items-center">
        <div className="text-center px-6">
          <h3 className="text-xl font-medium text-[var(--ink)]/90 subhead">Unified Logic Interface</h3>
          <p className="mt-2 text-sm text-[var(--muted)] subtitle">
            ULI filters input and routes actions to engines. VIREL safeguards recursion. TESSERA notarizes and signs. Transparency without exposure.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Badge label="ULI" />
            <Badge label="VIREL" />
            <Badge label="TESSERA" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedOrbs(): JSX.Element {
  // three slowly drifting orbs with varying sizes/opacities
  const common = {
    initial: { opacity: 0.35, scale: 0.9 },
    animate: { opacity: 0.5, scale: 1.05 },
    transition: { duration: 10, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' }
  };
  return (
    <>
      <motion.div {...common} className="absolute -top-16 -left-20 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(140px 140px at 40% 40%, var(--glow), transparent 70%)' }} />
      <motion.div {...common} transition={{ ...common.transition, duration: 14 }}
        className="absolute top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(160px 160px at 60% 60%, #9C7BFF33, transparent 70%)' }} />
      <motion.div {...common} transition={{ ...common.transition, duration: 18 }}
        className="absolute bottom-[-40px] left-1/3 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(130px 130px at 50% 50%, #63E6FF22, transparent 70%)' }} />
      {/* gentle network lines */}
      <motion.div initial={{opacity:0.08}} animate={{opacity:0.14}} transition={{duration:12, repeat:Infinity, repeatType:'mirror'}}
        className="absolute inset-0"
        style={{ background: 'repeating-linear-gradient(120deg, rgba(99,230,255,0.07), rgba(99,230,255,0.07) 1px, transparent 1px, transparent 18px)'}} />
    </>
  );
}

/*** Components ***/
function Logo(): JSX.Element {
  return (
    <a href="#/" className="flex items-center gap-3 group">
      <div className="relative h-8 w-8 rounded-xl bg-[var(--card)] border border-[var(--border)] grid place-items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(20px_20px_at_30%_30%,var(--glow),transparent_70%)]"/>
        <span className="text-sm">◴</span>
      </div>
      <span className="font-medium tracking-wide text-[var(--ink)] group-hover:text-[var(--accent)] transition">Caeliaris</span>
    </a>
  );
}

function CTA({href, label, primary}:{href:string; label:string; primary?:boolean;}): JSX.Element {
  return (
    <a
      href={href}
      className={[
        'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm',
        primary
          ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/20'
          : 'border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
      ].join(' ')}
    >
      {label}
      <span className="opacity-70">→</span>
    </a>
  );
}

function Badge({label}:{label:string;}): JSX.Element {
  return (
    <div className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1 text-xs text-[var(--muted)]">
      {label}
    </div>
  );
}

function SectionTitle({kicker,title,subtitle}:{kicker:string; title:string; subtitle:string;}): JSX.Element {
  return (
    <div>
      <div className="text-[var(--accent-2)] text-xs uppercase tracking-[0.18em] subhead">{kicker}</div>
      <h2 className="mt-2 text-2xl md:text-4xl font-semibold text-[var(--ink)] subhead">{title}</h2>
      <p className="mt-3 text-[var(--muted)] max-w-2xl subtitle">{subtitle}</p>
    </div>
  );
}

function EngineCard({ ekey, title, desc, cta }:{ ekey:EngineKey; title:string; desc:string; cta:string;}): JSX.Element {
  const route = `#/engines/${ekey}`;
  return (
    <motion.a href={route} whileHover={{ y:-4 }}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 overflow-hidden relative">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(300px_120px_at_80%_-20%,var(--glow),transparent_70%)]" />
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-[var(--ink)] subhead">{title}</h3>
        <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition">{cta} →</span>
      </div>
      <p className="mt-3 text-sm text-[var(--muted)] subtitle">{desc}</p>
    </motion.a>
  );
}

function IndustryCard({ title, items }:{ title:string; items:string[];}): JSX.Element {
  return (
    <motion.div whileHover={{y:-4}} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <h4 className="text-[var(--ink)] font-medium subhead">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-[var(--muted)] subtitle">
        {items.map((i)=> <li key={i}>• {i}</li>)}
      </ul>
    </motion.div>
  );
}

function BackgroundFX({scrollY}:{scrollY:number;}): JSX.Element {
  const o1 = 40 + scrollY * 0.04; // parallax offsets
  const o2 = 120 - scrollY * 0.02;
  return (
    <>
      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />
      {/* floating orbs */}
      <div className="pointer-events-none absolute -left-24 top-28 h-64 w-64 rounded-full blur-3xl opacity-40" style={{ background:'radial-gradient(120px 120px at 30% 30%, var(--glow), transparent 70%)', transform:`translateY(${o1}px)` }} />
      <div className="pointer-events-none absolute -right-24 top-[480px] h-64 w-64 rounded-full blur-3xl opacity-30" style={{ background:'radial-gradient(140px 140px at 60% 60%, #9C7BFF33, transparent 70%)', transform:`translateY(${o2}px)` }} />
    </>
  );
}

// =============================
// Inline tests (Vitest) — run with `vitest`
// =============================
const __vitest__ = (import.meta as any).vitest;
if (__vitest__) {
  const { describe, it, expect } = __vitest__;
  describe('data arrays', () => {
    it('engines: 6 items and titles exist', () => {
      expect(engines.length).toBe(6);
      expect(engines.map(e=>e.key)).toEqual(['RIE','MIE','DAFE','EIIE','LIE','TAXE']);
    });
    it('industries: 6 items and each has 3+ bullets', () => {
      expect(industries.length).toBe(6);
      industries.forEach(i => expect(i.items.length).toBeGreaterThanOrEqual(3));
    });
  });
  describe('routing', () => {
    it('home route', () => {
      expect(resolveRoute('#/').type).toBe('home');
    });
    it('section routes', () => {
      expect(resolveRoute('#/industries')).toEqual({ type:'section', anchor:'industries' });
    });
    it('engine route is case-insensitive and returns uppercase key', () => {
      const r = resolveRoute('#/engines/rie');
      expect(r.type).toBe('engine');
      // @ts-expect-error runtime shape check
      expect(r.engine).toBe('RIE');
    });
    it('industry subpage route', () => {
      const r = resolveRoute('#/industries/education');
      expect(r).toEqual({ type:'industry', industry:'education' });
    });
  });
  describe('flows', () => {
  it('LIE has a law flow with >= 4 steps', () => {
    const f = getFlow('LIE','law');
    expect(f.steps.length).toBeGreaterThanOrEqual(4);
  });
  it('DAFE finance flow starts with Intake and ends with Receipt', () => {
    const f = getFlow('DAFE','finance');
    expect(f.steps[0].id).toBe('intake');
    expect(f.steps.at(-1)?.id).toBe('receipt');
  });
});

}
