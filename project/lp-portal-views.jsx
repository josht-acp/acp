/* LP Portal — page views · built on seed data */
/* eslint-disable react/prop-types */

const { LP, FUNDS, CALLS, COINVEST, DOCS, MESSAGES, VINTAGES } = window;

const moneyAud = (m) => 'A$ ' + (m >= 10 ? m.toFixed(1) : m.toFixed(2)) + 'M';
const sumField = (arr, f) => arr.reduce((s,x)=>s + (x[f]||0), 0);

/* ─────────── OVERVIEW ─────────── */

const OverviewPage = () => {
  const totalCommit = sumField(FUNDS,'commitment');
  const totalCalled = sumField(FUNDS,'called');
  const totalDistro = sumField(FUNDS,'distributed');
  const totalNav    = sumField(FUNDS,'nav');
  const calledPct   = (totalCalled / totalCommit * 100);
  const dpi = (totalDistro / totalCalled);
  const tvpi = ((totalDistro + totalNav) / totalCalled);
  const rvpi = (totalNav / totalCalled);
  const reserved = sumField(FUNDS,'reserved');
  const uncalled = sumField(FUNDS,'uncalled');
  const reservedPct = reserved / totalCommit * 100;
  const uncalledPct = uncalled / totalCommit * 100;

  return (
    <>
      <div className="topbar">
        <div>
          <div className="crumb">Overview <span>/ Dashboard</span></div>
          <h1 className="page-t">Welcome back, <em>{LP.name.replace('Ms ','')}.</em></h1>
          <p className="page-s">Summary of your position across {FUNDS.length} funds with Ascension Capital Partners. Figures as of 31 Mar 2026. Quarterly valuation signed by the GP.</p>
        </div>
        <div className="topbar-actions">
          <button className="btn btn-sec">Request call with GP</button>
          <button className="btn btn-sec">Download Q1 report</button>
          <button className="btn btn-pri">New commitment →</button>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi-l">Total Commitment</div>
          <div className="kpi-v">A$ {totalCommit.toFixed(1)}<small>M</small></div>
          <div className="kpi-s">Across {FUNDS.length} funds</div>
        </div>
        <div className="kpi">
          <div className="kpi-delta">+12.4%</div>
          <div className="kpi-l">Called to Date</div>
          <div className="kpi-v">A$ {totalCalled.toFixed(1)}<small>M</small></div>
          <div className="kpi-s">{calledPct.toFixed(1)}% drawn</div>
        </div>
        <div className="kpi">
          <div className="kpi-delta">+4.1%</div>
          <div className="kpi-l">Distributed</div>
          <div className="kpi-v">A$ {totalDistro.toFixed(1)}<small>M</small></div>
          <div className="kpi-s">DPI {dpi.toFixed(2)}x</div>
        </div>
        <div className="kpi">
          <div className="kpi-l">Current NAV</div>
          <div className="kpi-v">A$ {totalNav.toFixed(1)}<small>M</small></div>
          <div className="kpi-s">As of 31 Mar 2026</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-h">
            <div className="card-t">Commitment & Performance</div>
            <div className="card-a">Deployment detail →</div>
          </div>
          <div className="deploy">
            <div className="deploy-track">
              <div className="deploy-seg seg-called" style={{width:calledPct+'%'}}>{calledPct.toFixed(0)}%</div>
              <div className="deploy-seg seg-reserved" style={{width:reservedPct+'%'}}>{reservedPct.toFixed(0)}%</div>
              <div className="deploy-seg seg-uncalled" style={{width:uncalledPct+'%'}}>{uncalledPct.toFixed(0)}%</div>
            </div>
            <div className="deploy-lgd">
              <span><span className="lgd-dot" style={{background:'var(--acp-gold)'}}/>Called · A$ {totalCalled.toFixed(1)}M</span>
              <span><span className="lgd-dot" style={{background:'rgba(201,168,76,0.4)'}}/>Reserved · A$ {reserved.toFixed(1)}M</span>
              <span><span className="lgd-dot" style={{background:'var(--acp-slate)'}}/>Uncalled · A$ {uncalled.toFixed(1)}M</span>
            </div>
          </div>
          <div className="mults">
            <div>
              <div className="mult-k">TVPI</div>
              <div className="mult-v">{tvpi.toFixed(2)}<em>x</em></div>
              <div className="mult-n">Total value / paid-in</div>
            </div>
            <div>
              <div className="mult-k">DPI</div>
              <div className="mult-v">{dpi.toFixed(2)}<em>x</em></div>
              <div className="mult-n">Distributed / paid-in</div>
            </div>
            <div>
              <div className="mult-k">RVPI</div>
              <div className="mult-v">{rvpi.toFixed(2)}<em>x</em></div>
              <div className="mult-n">Residual / paid-in</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <div className="card-t">Vintage performance</div>
            <div className="card-a">Methodology →</div>
          </div>
          <div style={{fontSize:11,color:'var(--acp-silver)',fontFamily:'var(--font-mono)',letterSpacing:'0.05em',marginBottom:12,lineHeight:1.5}}>
            Net IRR by vintage · benchmarked against Cambridge Associates median
          </div>
          <div className="chart">
            <div className="chart-rows">
              {VINTAGES.map(v => (
                <div key={v.year}>
                  <div className="chart-row">
                    <div className="chart-year">{v.year} · ACP</div>
                    <div className="chart-bar-wrap"><div className="chart-bar" style={{width:(v.acp/20*100)+'%'}}/></div>
                    <div className="chart-val">{v.acp.toFixed(1)}%</div>
                  </div>
                  <div className="chart-row" style={{marginTop:4}}>
                    <div className="chart-year" style={{color:'var(--acp-steel)'}}>&nbsp;&nbsp;bench.</div>
                    <div className="chart-bar-wrap"><div className="chart-bar bench" style={{width:(v.bench/20*100)+'%'}}/></div>
                    <div className="chart-val" style={{color:'var(--acp-silver)',fontSize:13}}>{v.bench.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-lgd">
              <span><span className="lgd-dot" style={{background:'var(--acp-gold)'}}/>ACP net IRR</span>
              <span><span className="lgd-dot" style={{background:'var(--acp-slate)'}}/>Cambridge median</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:14}}>
        <div className="card-t" style={{fontSize:18}}>Fund Holdings <span style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.14em',color:'var(--acp-gold-dark)',marginLeft:10}}>{FUNDS.length} · AUD</span></div>
        <div className="card-a">All holdings →</div>
      </div>

      {FUNDS.map(f => (
        <div key={f.id} className="fund">
          <div>
            <div className="fund-meta">
              <span className="fund-code">{f.code}</span>
              <span className="fund-status">{f.status}</span>
            </div>
            <div className="fund-name">{f.name}</div>
            <div className="fund-sub">Vintage {f.vintage} · {f.ccy}-denominated · {f.life} · GP: Ascension Capital Partners</div>
          </div>
          <div className="fund-stats">
            <div className="fund-stat">
              <div className="fund-stat-l">Commitment</div>
              <div className="fund-stat-v">{moneyAud(f.commitment)}</div>
            </div>
            <div className="fund-stat">
              <div className="fund-stat-l">Called</div>
              <div className="fund-stat-v">{moneyAud(f.called)}</div>
            </div>
            <div className="fund-stat">
              <div className="fund-stat-l">NAV</div>
              <div className="fund-stat-v">{moneyAud(f.nav)}</div>
            </div>
            <div className="fund-stat">
              <div className="fund-stat-l">Net IRR</div>
              <div className="fund-stat-v gold">{f.irr.toFixed(1)}%</div>
            </div>
          </div>
          <div className="fund-bar">
            <div className="fund-bar-track">
              <div className="fund-bar-called" style={{width:(f.called/f.commitment*100)+'%'}}/>
              <div className="fund-bar-reserved" style={{width:(f.reserved/f.commitment*100)+'%'}}/>
            </div>
            <div className="fund-bar-legend">
              <span>Called {moneyAud(f.called)} · {(f.called/f.commitment*100).toFixed(1)}%</span>
              <span>Reserved {(f.reserved/f.commitment*100).toFixed(1)}%</span>
              <span>TVPI {f.tvpi.toFixed(2)}x · DPI {f.dpi.toFixed(2)}x</span>
            </div>
          </div>
        </div>
      ))}

      <div style={{marginTop:32,display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:14}}>
        <div className="card-t" style={{fontSize:18}}>Co-Investment Opportunities</div>
        <div className="card-a">All opportunities →</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:32}}>
        {COINVEST.map(ci => (
          <div key={ci.id} className="ci">
            <div className="ci-cta">{ci.status}</div>
            <div className="ci-h">
              <div className="ci-ico">{ci.code}</div>
              <div className="ci-meta">
                <div className="ci-name">{ci.name}</div>
                <div className="ci-tags"><b>{ci.sector}</b> · {ci.geo}</div>
              </div>
            </div>
            <div className="ci-body">
              <div>
                <div className="ci-stat-l">Deal Size</div>
                <div className="ci-stat-v">{ci.dealSize}</div>
              </div>
              <div>
                <div className="ci-stat-l">LP Allocation</div>
                <div className="ci-stat-v">{ci.lpAllocation}</div>
              </div>
              <div>
                <div className="ci-stat-l">Target IRR</div>
                <div className="ci-stat-v" style={{color:'var(--acp-gold-light)'}}>{ci.irr}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="qa-grid">
        <div className="qa">
          <div className="qa-l"><b>Capital Call #6 pending</b><span>A$ 1.875M due 5 May 2026</span></div>
          <div className="qa-arr">→</div>
        </div>
        <div className="qa">
          <div className="qa-l"><b>Q1 report ready</b><span>Fund I + Fund II · signed 21 Apr</span></div>
          <div className="qa-arr">→</div>
        </div>
        <div className="qa">
          <div className="qa-l"><b>GP call available</b><span>Joshua Ting · 48-hr response</span></div>
          <div className="qa-arr">→</div>
        </div>
      </div>

      <div className="card">
        <div className="card-h">
          <div className="card-t">Recent Documents</div>
          <div className="card-a">Open data room →</div>
        </div>
        {DOCS.slice(0,4).map((d,i)=>(
          <div key={i} className="doc">
            <div className="doc-type">{d.type}</div>
            <div className="doc-name">
              {d.name}
              {d.tag === 'Signed by GP' && <span className="pill signed">Signed</span>}
              {d.tag === 'Confidential' && <span className="pill conf">Confidential</span>}
              {d.tag === 'Executed' && <span className="pill exec">Executed</span>}
            </div>
            <div className="doc-meta">{d.date}</div>
            <div className="doc-size">{d.size}</div>
          </div>
        ))}
      </div>
    </>
  );
};

/* ─────────── FUND HOLDINGS ─────────── */

const FundPage = () => (
  <>
    <div className="topbar">
      <div>
        <div className="crumb">Q1 Allocations <span>/ Fund Holdings</span></div>
        <h1 className="page-t">Fund Holdings.</h1>
        <p className="page-s">Primary commitments to Ascension Capital Partners funds. Figures refreshed quarterly post-IC valuation. For co-investments see the adjacent view.</p>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-sec">Export CSV</button>
        <button className="btn btn-pri">New commitment →</button>
      </div>
    </div>

    {FUNDS.map(f => (
      <div key={f.id} className="card" style={{marginBottom:20}}>
        <div className="card-h">
          <div>
            <div className="fund-meta"><span className="fund-code">{f.code}</span><span className="fund-status">{f.status}</span></div>
            <div className="card-t" style={{marginTop:8}}>{f.name}</div>
            <div className="fund-sub">Vintage {f.vintage} · {f.ccy}-denominated · {f.life}</div>
          </div>
          <div className="card-a">Quarterly pack →</div>
        </div>
        <div className="mults">
          <div><div className="mult-k">Commitment</div><div className="mult-v">{moneyAud(f.commitment)}</div></div>
          <div><div className="mult-k">Called</div><div className="mult-v">{moneyAud(f.called)}</div></div>
          <div><div className="mult-k">NAV</div><div className="mult-v">{moneyAud(f.nav)}</div></div>
        </div>
        <div className="mults" style={{marginTop:18}}>
          <div><div className="mult-k">TVPI</div><div className="mult-v">{f.tvpi.toFixed(2)}<em>x</em></div></div>
          <div><div className="mult-k">DPI</div><div className="mult-v">{f.dpi.toFixed(2)}<em>x</em></div></div>
          <div><div className="mult-k">Net IRR</div><div className="mult-v" style={{color:'var(--acp-gold-light)'}}>{f.irr.toFixed(1)}<em>%</em></div></div>
        </div>
      </div>
    ))}
  </>
);

/* ─────────── CASH FLOWS / CAPITAL CALLS ─────────── */

const CashFlowsPage = () => (
  <>
    <div className="topbar">
      <div>
        <div className="crumb">Cash Flows <span>/ Capital Calls</span></div>
        <h1 className="page-t">Capital Calls.</h1>
        <p className="page-s">Full history of calls issued against your commitments, with the next pending item at the top. Wire instructions unchanged since first close — see Wire Instructions for the AUD settlement block.</p>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-sec">Download schedule</button>
        <button className="btn btn-pri">Confirm payment →</button>
      </div>
    </div>

    <div className="card" style={{padding:0}}>
      <table className="tbl">
        <thead><tr>
          <th>Ref</th><th>Fund</th><th>Date</th><th style={{textAlign:'right'}}>Amount</th><th style={{textAlign:'right'}}>%</th><th>Status</th>
        </tr></thead>
        <tbody>
          {CALLS.map(c => (
            <tr key={c.id}>
              <td className="mono">{c.id}</td>
              <td>{c.fund}</td>
              <td className="mono">{c.date}</td>
              <td className="num">A$ {c.amount.toFixed(3)}M</td>
              <td className="pct">{c.pct.toFixed(1)}%</td>
              <td>
                {c.status==='pending'
                  ? <span style={{display:'inline-block',padding:'3px 10px',borderRadius:999,fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.14em',background:'rgba(245,158,11,0.1)',color:'var(--acp-warning)',border:'1px solid rgba(245,158,11,0.25)',textTransform:'uppercase'}}>Pending</span>
                  : <span style={{display:'inline-block',padding:'3px 10px',borderRadius:999,fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.14em',background:'rgba(34,197,94,0.1)',color:'var(--acp-success)',border:'1px solid rgba(34,197,94,0.25)',textTransform:'uppercase'}}>Paid</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

/* ─────────── DATA ROOM ─────────── */

const DocsPage = () => (
  <>
    <div className="topbar">
      <div>
        <div className="crumb">Documents & Comms <span>/ Data Room</span></div>
        <h1 className="page-t">Data Room.</h1>
        <p className="page-s">Signed, confidential, and working documents across your commitments. Search, filter, and download. Every action is audit-logged to the GP.</p>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-sec">Filter</button>
        <button className="btn btn-sec">Audit log</button>
      </div>
    </div>

    <div className="card" style={{padding:0}}>
      {DOCS.map((d,i)=>(
        <div key={i} className="doc">
          <div className="doc-type">{d.type}</div>
          <div className="doc-name">
            {d.name}
            {d.tag === 'Signed by GP' && <span className="pill signed">Signed</span>}
            {d.tag === 'Confidential' && <span className="pill conf">Confidential</span>}
            {d.tag === 'Executed' && <span className="pill exec">Executed</span>}
          </div>
          <div className="doc-meta">{d.date}</div>
          <div className="doc-size">{d.size}</div>
        </div>
      ))}
    </div>
  </>
);

/* ─────────── GP MESSAGES ─────────── */

const CommsPage = () => (
  <>
    <div className="topbar">
      <div>
        <div className="crumb">Documents & Comms <span>/ GP Messages</span></div>
        <h1 className="page-t">GP Messages.</h1>
        <p className="page-s">Direct line to the managing partner. 48-hour response on all items. Threaded conversations; logged alongside your account.</p>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-pri">New message →</button>
      </div>
    </div>

    {MESSAGES.map((m,i) => (
      <div key={i} className="msg">
        <div className="msg-h">
          <div className="msg-f">{m.from}</div>
          <div className="msg-d">{m.date}</div>
        </div>
        <div className="msg-b">{m.body}</div>
      </div>
    ))}
  </>
);

/* ─────────── PLACEHOLDER ─────────── */

const PlaceholderPage = ({nav}) => (
  <>
    <div className="topbar">
      <div>
        <div className="crumb">Coming soon</div>
        <h1 className="page-t">{nav.label}.</h1>
        <p className="page-s">This surface is scoped and mocked in the full build plan. In the preview we've focused on Dashboard, Fund Holdings, Capital Calls, Data Room and GP Messages — the five surfaces a prospective LP needs on day one.</p>
      </div>
    </div>
    <div className="card" style={{textAlign:'center',padding:'80px 40px',borderStyle:'dashed'}}>
      <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.18em',color:'var(--acp-gold-dark)',textTransform:'uppercase',marginBottom:14}}>Surface · in build</div>
      <div style={{fontFamily:'var(--font-display)',fontSize:24,color:'var(--acp-pearl)',maxWidth:520,margin:'0 auto 16px'}}>{nav.label}</div>
      <div style={{fontSize:13,color:'var(--acp-silver)',maxWidth:480,margin:'0 auto',lineHeight:1.6}}>Wireframed in the full portal spec; not rendered in this preview. Routing, IA, and auth gating already live.</div>
    </div>
  </>
);

Object.assign(window, {
  OverviewPage, FundPage, CashFlowsPage, DocsPage, CommsPage, PlaceholderPage,
});
