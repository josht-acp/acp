'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from '../portal-pages.module.css';

interface Overview {
  lp: { name: string; entity: string };
  summary: {
    total_committed: number;
    total_called: number;
    total_distributed: number;
    nav: number;
    uncalled: number;
  };
  performance: {
    tvpi: number;
    dpi: number;
    rvpi: number;
    irr: number;
  };
  funds: Array<{
    fund_id: string;
    fund_name: string;
    vintage: number;
    committed: number;
    called: number;
    distributed: number;
    nav: number;
    tvpi: number;
    irr: number;
  }>;
  recent_calls: Array<{
    call_id: string;
    fund_name: string;
    call_number: number;
    amount: number;
    due_date: string;
    status: string;
  }>;
}

function fmt(n: number) {
  if (n >= 1_000_000_000) return `A$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `A$${(n / 1_000_000).toFixed(1)}M`;
  return `A$${(n / 1_000).toFixed(0)}K`;
}

function pct(called: number, committed: number) {
  return committed > 0 ? `${((called / committed) * 100).toFixed(0)}%` : '—';
}

export default function OverviewPage() {
  const router = useRouter();
  const [data, setData] = useState<Overview | null>(null);
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
        setData(await res.json());
      })
      .catch(() => setError('Unable to load portfolio data. Please refresh.'));
  }, [router]);

  if (error) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>{error}</p></div></div>;
  if (!data) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>Loading&hellip;</p></div></div>;

  const { summary, performance, funds, recent_calls } = data;

  return (
    <div className={s.page}>
      <div className={s.pageInner}>
        <div className={s.pageHeader}>
          <div className={s.eyebrow}>LP Investor Portal</div>
          <h1 className={s.pageTitle}>Portfolio Overview</h1>
        </div>

        {/* Summary stats */}
        <div className={`${s.statsRow} ${s.statsRow5}`}>
          {[
            { label: 'Total Committed', value: fmt(summary.total_committed) },
            { label: 'Capital Called', value: fmt(summary.total_called), sub: pct(summary.total_called, summary.total_committed) + ' drawn' },
            { label: 'Distributions', value: fmt(summary.total_distributed) },
            { label: 'Net Asset Value', value: fmt(summary.nav) },
            { label: 'Uncalled', value: fmt(summary.uncalled) },
          ].map(c => (
            <div key={c.label} className={s.statCard}>
              <div className={s.statLabel}>{c.label}</div>
              <div className={s.statValue}>{c.value}</div>
              {c.sub && <div className={s.statSub}>{c.sub}</div>}
            </div>
          ))}
        </div>

        {/* Performance metrics */}
        <div className={s.metricsGrid}>
          {[
            { label: 'Total Value / Paid-In', value: performance.tvpi.toFixed(2) + '×', note: 'TVPI' },
            { label: 'Distributions / Paid-In', value: performance.dpi.toFixed(2) + '×', note: 'DPI' },
            { label: 'Residual Value / Paid-In', value: performance.rvpi.toFixed(2) + '×', note: 'RVPI' },
            { label: 'Net IRR', value: performance.irr.toFixed(1) + '%', note: 'Since Inception' },
          ].map(m => (
            <div key={m.note} className={s.metricCell}>
              <div className={s.metricLabel}>{m.label}</div>
              <div className={s.metricValue}>{m.value}</div>
              <div className={s.metricNote}>{m.note}</div>
            </div>
          ))}
        </div>

        <div className={s.cols32}>
          {/* Fund holdings table */}
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>Fund Holdings</span>
            </div>
            <div className={s.panelBody}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Fund</th>
                    <th>Vintage</th>
                    <th>Committed</th>
                    <th>Called</th>
                    <th>TVPI</th>
                    <th>Net IRR</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map(f => (
                    <tr key={f.fund_id}>
                      <td>{f.fund_name}</td>
                      <td className={s.tableLabel}>{f.vintage}</td>
                      <td>{fmt(f.committed)}</td>
                      <td>{fmt(f.called)}</td>
                      <td className={s.statGold}>{f.tvpi.toFixed(2)}×</td>
                      <td className={s.statPositive}>{f.irr.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent capital calls */}
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>Recent Capital Calls</span>
            </div>
            <div className={s.panelBody}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Fund / Call</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent_calls.slice(0, 5).map(c => (
                    <tr key={c.call_id}>
                      <td>
                        <div style={{ fontSize: 13, color: 'var(--acp-pearl)' }}>{c.fund_name}</div>
                        <div className={s.tableLabel}>Call #{c.call_number}</div>
                      </td>
                      <td>{fmt(c.amount)}</td>
                      <td>
                        <span className={`${s.chip} ${
                          c.status === 'paid'    ? s.chipPaid :
                          c.status === 'overdue' ? s.chipDue  : s.chipPending
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
