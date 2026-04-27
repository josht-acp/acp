import styles from './Sections.module.css';

const PILLARS = [
  {
    phase: 'Phase 01 · Originate',
    title: 'Originate',
    desc: 'Proprietary mandates with mid-teens IRR potential or 11–16% gross credit yield. Deal flow from sponsor relationships, not inbound decks.',
  },
  {
    phase: 'Phase 02 · Structure',
    title: 'Structure',
    desc: 'LMA / LSTA / ICMA / ILPA market-standard documentation. First-lien security, DSRA, offtake-backed revenue. No bespoke one-off risk transfer.',
  },
  {
    phase: 'Phase 03 · Distribute',
    title: 'Distribute',
    desc: 'Qualified institutional capital: family offices, credit funds, DFIs, sovereign-adjacent and ECA-backed lenders. KYC / AML cleared.',
  },
];

export default function Pillars() {
  return (
    <div className="sectionFull">
      <div className="sectionInner">
        <div className="sectionHead">
          <div>
            <div className="eyebrow"><span className="rule"/><span className="num">04</span> · What We Do</div>
            <h2 className="sectionTitle">Originate. <em>Structure.</em> Distribute.</h2>
          </div>
          <p className="sectionDesc">
            Three activities, one continuous process. No handoffs, no off-market asymmetric risk transfer,
            no retail capital intermediation.
          </p>
        </div>
        <div className={styles.pillars}>
          {PILLARS.map(p => (
            <div key={p.phase} className={styles.pillar}>
              <div className={styles.pillarPhase}>{p.phase}</div>
              <div className={styles.pillarTitle}>{p.title}</div>
              <div className={styles.pillarDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
