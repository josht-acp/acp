import styles from './Sections.module.css';

const METRICS = [
  { value: 'USD 10bn+', label: 'Cumulative transactions led across UK, US, Australia, Middle East and Europe' },
  { value: 'USD 5.8bn+', label: 'Live mandate programme across 20+ named assets' },
  { value: '7', label: 'Verticals with proprietary origination' },
  { value: '4', label: 'Regions · institutional counterparties only' },
  { value: '12+ yrs', label: 'Track record in PC, PF, infrastructure' },
];

export default function MetricsStrip() {
  return (
    <section className="section">
      <div className="eyebrow" style={{ marginBottom: 32 }}>
        <span className="rule"/>
        <span className="num">02</span>
        · By the Numbers
      </div>
      <div className={styles.metrics}>
        {METRICS.map((m, i) => (
          <div key={i} className={styles.metric}>
            <div className={styles.metricVal}>{m.value}</div>
            <div className={styles.metricLabel}>{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
