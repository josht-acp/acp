import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { VERTICALS } from '@/lib/data';
import CtaBand from '@/components/sections/CtaBand';
import styles from './vertical.module.css';

type Params = { slug: string };

export async function generateStaticParams() {
  return VERTICALS.map(v => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const v = VERTICALS.find(v => v.slug === params.slug);
  if (!v) return {};
  return {
    title: `${v.title} — Ascension Capital Partners`,
    description: v.body,
  };
}

export default function VerticalPage({ params }: { params: Params }) {
  const v = VERTICALS.find(v => v.slug === params.slug);
  if (!v) notFound();

  return (
    <>
      {/* Header */}
      <section className="section" style={{ paddingTop: 72, paddingBottom: 56 }}>
        <div className="monoLabel" style={{ marginBottom: 24 }}>
          Capabilities · Vertical · <span style={{ color: 'var(--acp-gold-light)' }}>{v.title}</span>
        </div>
        <h1
          className={styles.pageTitle}
          dangerouslySetInnerHTML={{ __html: v.pageTitle }}
        />
      </section>

      {/* Overview + Facility Profile */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className={styles.overview}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}><span className="rule"/>Overview</div>
            <p className={styles.body}>{v.body}</p>
            <p className={styles.bodyMuted}>
              Mandates structured to LMA/LSTA documentation with DSCR-driven underwriting, DSRA
              and offtake-backed revenue where available. ECA-wrap and DFI co-investment on qualifying transactions.
            </p>
          </div>
          <div className="factCard">
            <div className="factLabel">Facility profile</div>
            {[
              ['Ticket size', v.ticket],
              ['Instruments', v.instruments],
              ['Sectors', v.sectors],
              ['Key metrics', v.metrics],
              ['Documentation', 'LMA / LSTA standard'],
              ['Coverage', 'APAC · EMEA · Americas'],
            ].map(([k, val]) => (
              <div key={k} className="factRow">
                <span className="k">{k}</span>
                <span className="v">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria */}
      <div className="sectionFull">
        <div className="sectionInner">
          <div className="sectionHead">
            <div>
              <div className="eyebrow"><span className="rule"/><span className="num">02</span> · What We Screen For</div>
              <h2 className="sectionTitle">Three criteria. <em>Non-negotiable.</em></h2>
            </div>
            <p className="sectionDesc">
              We do not engage on mandates that fail any of the three. No waivers, no exceptions on documentation grade.
            </p>
          </div>
          <div className={styles.pillars}>
            {v.criteria.map(([t, d], i) => (
              <div key={i} className={styles.pillar}>
                <div className={styles.pillarPhase}>Criterion 0{i + 1}</div>
                <div className={styles.pillarTitle}>{t}</div>
                <div className={styles.pillarDesc}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Representative Mandates */}
      <section className="section">
        <div className="sectionHead">
          <div>
            <div className="eyebrow"><span className="rule"/><span className="num">03</span> · Representative Mandates</div>
            <h2 className="sectionTitle">Select <em>engagements.</em></h2>
          </div>
          <p className="sectionDesc">Indicative only. Counterparty names withheld under standing confidentiality.</p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Mandate</th>
              <th>Sector</th>
              <th>Region</th>
              <th>Role</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Utility-scale solar PF</td><td>Solar · PV</td><td>APAC</td><td>Sole Arranger</td><td className={styles.mono}>USD 140m</td><td><span className="chip closed">Closed</span></td></tr>
            <tr><td>BESS co-investment</td><td>Storage</td><td>EMEA</td><td>Co-Advisor</td><td className={styles.mono}>USD 75m</td><td><span className="chip live">Live</span></td></tr>
            <tr><td>Grid-connected wind platform</td><td>Wind</td><td>Americas</td><td>MLA</td><td className={styles.mono}>USD 220m</td><td><span className="chip live">Live</span></td></tr>
            <tr><td>CHP + CCU programme</td><td>CHP / CCU</td><td>UK</td><td>Lead Arranger</td><td className={styles.mono}>GBP 650m+</td><td><span className="chip closed">Closed</span></td></tr>
          </tbody>
        </table>
      </section>

      <CtaBand
        title="Initiate contact <em>directly.</em>"
        body="We respond within 48 hours on qualified enquiries. Engagement begins with an executed NDA; mandate letters follow under LMA/LSTA-style documentation."
        cta="Request Institutional Access"
      />
    </>
  );
}
