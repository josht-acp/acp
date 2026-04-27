'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from '../portal-pages.module.css';

interface CapitalCall {
  call_id: string;
  fund_name: string;
  call_number: number;
  amount: number;
  called_pct: number;
  notice_date: string;
  due_date: string;
  paid_date: string | null;
  status: 'pending' | 'paid' | 'overdue';
  purpose: string;
}

interface CapitalCallsData {
  calls: CapitalCall[];
  summary: {
    total_called: number;
    total_paid: number;
    total_pending: number;
  };
}

function fmt(n: number) {
  if (n >= 1_000_000_000) return `A$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `A$${(n / 1_000_000).toFixed(2)}M`;
  return `A$${(n / 1_000).toFixed(0)}K`;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function CapitalCallsPage() {
  const router = useRouter();
  const [data, setData] = useState<CapitalCallsData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('acp-portal-token');
    if (!token) { router.replace('/portal'); return; }

    fetch('/api/v1/lp/capital-calls', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async res => {
        if (res.status === 401) { router.replace('/portal'); return; }
        if (!res.ok) throw new Error();
        setData(await res.json());
      })
      .catch(() => setError('Unable to load capital calls. Please refresh.'));
  }, [router]);

  if (error) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>{error}</p></div></div>;
  if (!data) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>Loading&hellip;</p></div></div>;

  const pending = data.calls.filter(c => c.status !== 'paid');
  const paid    = data.calls.filter(c => c.status === 'paid');

  return (
    <div className={s.page}>
      <div className={s.pageInner}>
        <div className={s.pageHeader}>
          <div className={s.eyebrow}>LP Investor Portal</div>
          <h1 className={s.pageTitle}>Capital Calls</h1>
        </div>

        <div className={`${s.statsRow} ${s.statsRow3}`}>
          {[
            { label: 'Total Called (All Time)', value: fmt(data.summary.total_called) },
            { label: 'Total Paid',              value: fmt(data.summary.total_paid), cls: s.statPositive },
            { label: 'Outstanding / Pending',   value: fmt(data.summary.total_pending), cls: data.summary.total_pending > 0 ? s.statNegative : undefined },
          ].map(c => (
            <div key={c.label} className={s.statCard}>
              <div className={s.statLabel}>{c.label}</div>
              <div className={`${s.statValue} ${c.cls ?? ''}`}>{c.value}</div>
            </div>
          ))}
        </div>

        {pending.length > 0 && (
          <div className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>Outstanding Calls</span>
            </div>
            <div className={s.panelBody}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Fund</th>
                    <th>Call</th>
                    <th>Amount</th>
                    <th>Notice Date</th>
                    <th>Due Date</th>
                    <th>Purpose</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map(c => (
                    <tr key={c.call_id}>
                      <td>{c.fund_name}</td>
                      <td className={s.tableLabel}>#{c.call_number}</td>
                      <td>{fmt(c.amount)}</td>
                      <td className={s.tableLabel}>{fmtDate(c.notice_date)}</td>
                      <td className={s.tableLabel}>{fmtDate(c.due_date)}</td>
                      <td style={{ maxWidth: 200, fontSize: 12, color: 'var(--acp-silver)' }}>{c.purpose}</td>
                      <td>
                        <span className={`${s.chip} ${c.status === 'overdue' ? s.chipDue : s.chipPending}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className={s.panel}>
          <div className={s.panelHead}>
            <span className={s.panelTitle}>Call History</span>
          </div>
          <div className={s.panelBody}>
            {paid.length === 0 ? (
              <p className={s.empty}>No paid calls on record.</p>
            ) : (
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Fund</th>
                    <th>Call</th>
                    <th>Amount</th>
                    <th>% of Commitment</th>
                    <th>Notice Date</th>
                    <th>Due Date</th>
                    <th>Paid Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paid.map(c => (
                    <tr key={c.call_id}>
                      <td>{c.fund_name}</td>
                      <td className={s.tableLabel}>#{c.call_number}</td>
                      <td>{fmt(c.amount)}</td>
                      <td className={s.tableLabel}>{c.called_pct.toFixed(1)}%</td>
                      <td className={s.tableLabel}>{fmtDate(c.notice_date)}</td>
                      <td className={s.tableLabel}>{fmtDate(c.due_date)}</td>
                      <td className={s.tableLabel}>{c.paid_date ? fmtDate(c.paid_date) : '—'}</td>
                      <td>
                        <span className={`${s.chip} ${s.chipPaid}`}>paid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
