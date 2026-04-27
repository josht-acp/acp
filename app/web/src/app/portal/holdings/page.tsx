'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from '../portal-pages.module.css';

interface Fund {
  fund_id: string;
  fund_name: string;
  vintage: number;
  strategy: string;
  committed: number;
  called: number;
  distributed: number;
  nav: number;
  uncalled: number;
  tvpi: number;
  dpi: number;
  rvpi: number;
  irr: number;
  moic: number;
  commitment_date: string;
}

interface HoldingsData {
  lp: { name: string; entity: string };
  funds: Fund[];
  totals: {
    committed: number;
    called: number;
    distributed: number;
    nav: number;
    uncalled: number;
  };
}

function fmt(n: number) {
  if (n >= 1_000_000_000) return `A$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `A$${(n / 1_000_000).toFixed(2)}M`;
  return `A$${(n / 1_000).toFixed(0)}K`;
}

function drawn(called: number, committed: number) {
  return committed > 0 ? `${((called / committed) * 100).toFixed(1)}%` : '—';
}

export default function HoldingsPage() {
  const router = useRouter();
  const [data, setData] = useState<HoldingsData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('acp-portal-token');
    if (!token) { router.replace('/portal'); return; }

    fetch('/api/v1/lp/overview', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async res => {
        if (res.status === 401) { router.replace('/portal'); return; }
        if (!res.ok) throw new Error('Failed to load');
        const d = await res.json();
        setData({
          lp: d.lp,
          funds: d.funds,
          totals: {
            committed: d.summary.total_committed,
            called: d.summary.total_called,
            distributed: d.summary.total_distributed,
            nav: d.summary.nav,
            uncalled: d.summary.uncalled,
          },
        });
      })
      .catch(() => setError('Unable to load holdings. Please refresh.'));
  }, [router]);

  if (error) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>{error}</p></div></div>;
  if (!data) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>Loading&hellip;</p></div></div>;

  return (
    <div className={s.page}>
      <div className={s.pageInner}>
        <div className={s.pageHeader}>
          <div className={s.eyebrow}>LP Investor Portal</div>
          <h1 className={s.pageTitle}>Fund Holdings</h1>
        </div>

        <div className={`${s.statsRow} ${s.statsRow5}`}>
          {[
            { label: 'Total Committed', value: fmt(data.totals.committed) },
            { label: 'Capital Called', value: fmt(data.totals.called), sub: drawn(data.totals.called, data.totals.committed) + ' drawn' },
            { label: 'Distributions Received', value: fmt(data.totals.distributed) },
            { label: 'Net Asset Value', value: fmt(data.totals.nav) },
            { label: 'Remaining Unfunded', value: fmt(data.totals.uncalled) },
          ].map(c => (
            <div key={c.label} className={s.statCard}>
              <div className={s.statLabel}>{c.label}</div>
              <div className={s.statValue}>{c.value}</div>
              {c.sub && <div className={s.statSub}>{c.sub}</div>}
            </div>
          ))}
        </div>

        {data.funds.map(fund => (
          <div key={fund.fund_id} className={s.panel}>
            <div className={s.panelHead}>
              <div>
                <span className={s.panelTitle}>{fund.fund_name}</span>
                <span style={{ marginLeft: 16, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--acp-steel)' }}>
                  {fund.strategy} &middot; Vintage {fund.vintage}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--acp-steel)', textTransform: 'uppercase' }}>
                Committed {new Date(fund.commitment_date).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className={s.panelBody}>
              <div className={s.metricsGrid} style={{ marginBottom: 28 }}>
                {[
                  { label: 'TVPI', value: fund.tvpi.toFixed(2) + '×', note: 'Total Value / Paid-In' },
                  { label: 'DPI', value: fund.dpi.toFixed(2) + '×', note: 'Distributions / Paid-In' },
                  { label: 'RVPI', value: fund.rvpi.toFixed(2) + '×', note: 'Residual Value / Paid-In' },
                  { label: 'Net IRR', value: fund.irr.toFixed(1) + '%', note: 'Since Inception' },
                ].map(m => (
                  <div key={m.label} className={s.metricCell}>
                    <div className={s.metricLabel}>{m.label}</div>
                    <div className={s.metricValue}>{m.value}</div>
                    <div className={s.metricNote}>{m.note}</div>
                  </div>
                ))}
              </div>

              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Amount</th>
                    <th>% of Commitment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Commitment', amount: fund.committed, pct: '100.0%' },
                    { label: 'Capital Called', amount: fund.called, pct: drawn(fund.called, fund.committed) },
                    { label: 'Distributions', amount: fund.distributed, pct: drawn(fund.distributed, fund.committed) },
                    { label: 'Net Asset Value', amount: fund.nav, pct: drawn(fund.nav, fund.committed) },
                    { label: 'Uncalled Capital', amount: fund.uncalled, pct: drawn(fund.uncalled, fund.committed) },
                  ].map(row => (
                    <tr key={row.label}>
                      <td className={s.tableLabel}>{row.label}</td>
                      <td>{fmt(row.amount)}</td>
                      <td className={s.tableLabel}>{row.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
