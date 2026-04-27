'use client';
import { useState } from 'react';
import { TRANSACTIONS, TXN_REGIONS, TXN_TYPES } from '@/lib/data';
import CtaBand from '@/components/sections/CtaBand';
import styles from './transactions.module.css';

export default function TransactionsPage() {
  const [region, setRegion] = useState('APAC');
  const [ttype, setType]   = useState('ALL');

  const filtered = TRANSACTIONS.filter(t =>
    (region === 'ALL' || t.region === region) &&
    (ttype  === 'ALL' || t.type.toUpperCase() === ttype)
  );

  return (
    <>
      <section className="section" style={{ paddingBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}><span className="rule"/>Track Record</div>
        <h1 className={styles.pageTitle}>Transactions.</h1>
        <p className={styles.intro}>
          A representative slice of mandates we&apos;ve led or co-led. Names masked where obligations
          persist; sizes rounded; terms abbreviated. Filter by region or by what we were hired to do.
        </p>

        <div className={styles.filterLabel}>Region</div>
        <div className={styles.filterRow}>
          {TXN_REGIONS.map(r => (
            <button key={r} className={`${styles.pill} ${region === r ? styles.on : ''}`} onClick={() => setRegion(r)}>
              {r}
            </button>
          ))}
        </div>

        <div className={styles.filterLabel} style={{ marginTop: 28 }}>Mandate Type</div>
        <div className={styles.filterRow}>
          {TXN_TYPES.map(r => (
            <button key={r} className={`${styles.pill} ${ttype === r ? styles.on : ''}`} onClick={() => setType(r)}>
              {r}
            </button>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className={styles.grid}>
          {filtered.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardType}>{t.type}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.cardRegion}>{t.region}</span>
                </div>
                <span className={`chip ${t.status === 'LIVE' ? 'live' : 'closed'}`}>{t.status}</span>
              </div>
              <div className={styles.cardSize}>{t.size}</div>
              <div className={styles.cardDate}>{t.date}</div>
              <div className={styles.cardAsset}>{t.asset}</div>
              <div className={styles.cardDesc}>{t.desc}</div>
              <div className={styles.cardFoot}>
                <span className={styles.footK}>ROLE</span>
                <span className={styles.footV}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            Nothing on the books matching that cut. Try a wider region.
          </div>
        )}
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className={styles.metrics}>
          {[
            ['US$10BN+', 'Cumulative value led or co-led'],
            ['US$5.8BN', 'On the books right now'],
            ['12', 'Live mandates across the desk'],
            ['4', 'Regions · named counterparties only'],
          ].map(([v, l]) => (
            <div key={v} className={styles.metric}>
              <div className={styles.metricVal}>{v}</div>
              <div className={styles.metricLabel}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Small queue. <em>Short memos.</em>"
        body="We take on a limited number of mandates per quarter and staff each one at partner level. If the asset is real and the timing is yours, get on a call. Response inside two business days."
        cta="Open a Conversation"
      />
    </>
  );
}
