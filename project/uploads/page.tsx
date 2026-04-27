"use client";

import React, { useState } from "react";

const NAV_LINKS = ["About", "Capabilities", "Mandates", "Contact"];

const MANDATES = [
  {
    code: "EDGM",
    name: "EdgeMode / Project EDGM",
    value: "USD 1.5Bn",
    sector: "AI Infrastructure",
    region: "Spain / Europe",
    desc: "540MW Spanish AI data centre portfolio. Senior secured structured finance across 7 sites. PPA commission framework. Target Financial Close Q3 2026.",
  },
  {
    code: "AVC",
    name: "Aventurine Climate / WH2022",
    value: "£290–316M",
    sector: "Energy Transition",
    region: "United Kingdom",
    desc: "127MW gas peaker portfolio across 7 UK sites. Phase 1 project finance. Bridge facility coordination. Ascension holds 20% TopCo pari passu equity.",
  },
  {
    code: "MPG",
    name: "MPG / Project Falcon",
    value: "£2.0Bn",
    sector: "M&A",
    region: "United Kingdom",
    desc: "Buy-side mandate. Ascension holds 15% direct equity stake. Full institutional execution across due diligence, capital structure, and counterparty engagement.",
  },
  {
    code: "GTE",
    name: "Gran Tierra Energy",
    value: "USD 150–350M",
    sector: "Upstream O&G",
    region: "Latin America",
    desc: "45,700 boe/d producing asset base. Programme Mandate issued. Dual-sequence lender pre-marketing across global credit and sovereign fund counterparties.",
  },
  {
    code: "BNW",
    name: "Barnwell Canada",
    value: "CAD 365M+",
    sector: "Upstream O&G",
    region: "Canada",
    desc: "128-well acquisition programme. 12 Closing Events. SHA 51/49 executed. Progressive equity earn-in with Ascension holding 49% discretionary earnout.",
  },
  {
    code: "BNU",
    name: "Bennu Development ApS",
    value: "EUR 80M + USD 300M",
    sector: "Infrastructure / DCM",
    region: "Denmark / Luxembourg",
    desc: "Project finance across Helsinge and Kværkeby. EUR 80M senior debt plus USD 300M DCM/ECM programme. Luxembourg SICAV structure.",
  },
];

const CAPABILITIES = [
  {
    title: "Energy Transition & Infrastructure",
    items: ["Gas peaker & battery storage project finance", "Renewable energy capital formation", "Grid infrastructure debt & equity", "EPC/EPCM structuring"],
  },
  {
    title: "Upstream Oil & Gas",
    items: ["Reserve-based lending & RBL structuring", "Acquisition finance & programme mandates", "Senior secured credit facilities", "JV equity and co-investment structures"],
  },
  {
    title: "Private Credit & Placement",
    items: ["Senior secured debt arrangement", "Bridge & mezzanine coordination", "LP placement across credit funds", "Intercreditor & subordination structuring"],
  },
  {
    title: "M&A Advisory",
    items: ["Buy-side and sell-side mandates", "Strategic transaction structuring", "Capital raising for acquisitions", "Equity earn-in and earnout frameworks"],
  },
];

const STATS = [
  { value: "USD 5Bn+", label: "Active Mandate Value" },
  { value: "9", label: "Live Mandates" },
  { value: "14+", label: "Tracked Counterparties" },
  { value: "5", label: "Asset Classes" },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: "1px solid rgba(197,165,90,0.12)",
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(12px)",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "3px", height: "28px", background: "#C5A55A" }} />
          <div>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "16px", fontWeight: 600, letterSpacing: "0.02em", color: "#fff", lineHeight: 1.1 }}>
              Ascension Capital Partners
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9B9B9B" }}>
              t/a APEX Consulting Partners Pty Ltd
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{
              fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "#9B9B9B",
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C5A55A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9B9B9B")}
            >{l}</a>
          ))}
          <a href="#contact" style={{
            fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            background: "#C5A55A", color: "#000", padding: "9px 24px",
            textDecoration: "none", transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#d4b46a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#C5A55A")}
          >Enquire</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="gold-grid-bg" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 80px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197,165,90,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "900px", position: "relative" }}>
          <div className="anim-1" style={{
            fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.25em", textTransform: "uppercase", color: "#C5A55A",
            marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{ width: "32px", height: "1px", background: "#C5A55A" }} />
            Global Alternatives & Private Markets
          </div>

          <h1 className="anim-2 shimmer-gold" style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 700,
            lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "8px",
          }}>
            Institutional
          </h1>
          <h1 className="anim-3" style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 400,
            fontStyle: "italic", lineHeight: 1.05, letterSpacing: "-0.01em",
            color: "#fff", marginBottom: "8px",
          }}>
            Capital Formation.
          </h1>
          <h1 className="anim-3" style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 700,
            lineHeight: 1.05, letterSpacing: "-0.01em", color: "#fff",
            marginBottom: "40px",
          }}>
            At Fractional Cost.
          </h1>

          <p className="anim-4" style={{
            fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 300,
            lineHeight: 1.7, color: "#9B9B9B", maxWidth: "560px", marginBottom: "48px",
          }}>
            A zero-proprietary-capital alternatives advisory and placement platform. Arrangement, structuring, and capital introduction across energy transition, infrastructure, private credit, upstream O&G, and M&A.
          </p>

          <div className="anim-5" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#mandates" style={{
              background: "#C5A55A", color: "#000", fontFamily: "'Inter', sans-serif",
              fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "16px 40px", textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4b46a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C5A55A")}
            >View Active Mandates</a>
            <a href="#about" style={{
              background: "transparent", color: "#C5A55A", fontFamily: "'Inter', sans-serif",
              fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "15px 36px", border: "1px solid #C5A55A", textDecoration: "none",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#C5A55A"; e.currentTarget.style.color = "#000"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C5A55A"; }}
            >Our Approach</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-fade" style={{
          position: "absolute", bottom: "40px", left: "80px",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{ width: "40px", height: "1px", background: "#C5A55A" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B9B9B" }}>Scroll to explore</span>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        borderTop: "1px solid rgba(197,165,90,0.15)",
        borderBottom: "1px solid rgba(197,165,90,0.15)",
        background: "rgba(197,165,90,0.03)",
        padding: "48px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "40px",
      }}>
        {STATS.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 400, color: "#C5A55A", lineHeight: 1,
              marginBottom: "8px",
            }}>{s.value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9B9B9B" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C5A55A", marginBottom: "20px" }}>
              — About
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: "32px", color: "#fff" }}>
              Senior-Level Execution<br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#9B9B9B" }}>Across Every Mandate</span>
            </h2>
            <div style={{ width: "48px", height: "3px", background: "#C5A55A", marginBottom: "32px" }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "#9B9B9B", marginBottom: "24px" }}>
              Ascension Capital Partners operates as a multi-mandate alternatives advisory platform without proprietary capital. Every engagement is led and executed at partner level — no delegation to junior teams, no black-box processes.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "#9B9B9B", marginBottom: "40px" }}>
              We generate economics through arrangement fees, success fees, equity earnouts, and placement fees — aligning our incentives precisely with our clients' outcomes. Our institutional standards are applied consistently across a USD 5Bn+ active mandate portfolio.
            </p>
            <div style={{ borderLeft: "3px solid #C5A55A", paddingLeft: "20px" }}>
              <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "19px", fontStyle: "italic", color: "#fff", lineHeight: 1.5 }}>
                "Institutional quality at fractional cost — the defining proposition of an efficient alternatives platform."
              </p>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: "32px", padding: "32px", background: "rgba(197,165,90,0.04)", borderLeft: "3px solid #C5A55A" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C5A55A", marginBottom: "16px" }}>Principal</div>
              <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>Joshua Ting</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9B9B9B", marginBottom: "20px", lineHeight: 1.5 }}>
                Executive Managing Partner<br />Global Head of Alternatives & Private Markets
              </div>
              <div style={{ height: "1px", background: "rgba(197,165,90,0.15)", marginBottom: "20px" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.7, color: "#9B9B9B" }}>
                Lead arranger and sole senior execution resource across all active mandates. Deep expertise spanning energy transition project finance, upstream O&G structured credit, M&A advisory, and alternative capital placement.
              </p>
            </div>

            <div style={{ padding: "28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(197,165,90,0.1)" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C5A55A", marginBottom: "16px" }}>Counterparties Tracked</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["SMBC", "BNP Paribas", "ING", "PIMCO", "Ares", "Blackstone", "Brookfield", "Macquarie GIG", "UKIB", "Carlyle", "GIC", "ADIA"].map(c => (
                  <span key={c} style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    border: "1px solid rgba(197,165,90,0.25)", color: "#9B9B9B",
                    padding: "4px 10px",
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" style={{
        borderTop: "1px solid rgba(197,165,90,0.1)",
        background: "rgba(255,255,255,0.01)",
        padding: "120px 80px",
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C5A55A", marginBottom: "20px" }}>
            — Capabilities
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: "64px", color: "#fff" }}>
            Five Asset Classes.<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#9B9B9B" }}>One Institutional Standard.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(197,165,90,0.1)" }}>
            {CAPABILITIES.map((cap, i) => (
              <div key={i} style={{
                background: "#000", padding: "40px 32px",
                borderTop: "3px solid #C5A55A",
                transition: "background 0.3s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(197,165,90,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "#000")}
              >
                <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "24px", lineHeight: 1.3 }}>
                  {cap.title}
                </div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {cap.items.map((item, j) => (
                    <li key={j} style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300,
                      color: "#9B9B9B", lineHeight: 1.6, padding: "6px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      display: "flex", alignItems: "flex-start", gap: "10px",
                    }}>
                      <span style={{ color: "#C5A55A", marginTop: "2px", flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANDATES */}
      <section id="mandates" style={{ padding: "120px 80px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px" }}>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C5A55A", marginBottom: "16px" }}>
                — Active Mandates
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, lineHeight: 1.15, color: "#fff" }}>
                Execution in Progress.<br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "#9B9B9B" }}>Across the Globe.</span>
              </h2>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9B9B9B", textAlign: "right", lineHeight: 1.6 }}>
              Mandate details are indicative.<br />All engagements subject to NDA and KYC clearance.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {MANDATES.map(m => (
              <div key={m.code} className="mandate-card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "#000", background: "#C5A55A", padding: "3px 10px",
                  }}>{m.code}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    border: "1px solid rgba(197,165,90,0.3)", color: "#C5A55A",
                    padding: "3px 10px",
                  }}>{m.sector}</span>
                </div>
                <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: "8px" }}>
                  {m.name}
                </div>
                <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#C5A55A", marginBottom: "8px" }}>
                  {m.value}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9B9B9B", letterSpacing: "0.08em", marginBottom: "16px" }}>
                  {m.region}
                </div>
                <div style={{ height: "1px", background: "rgba(197,165,90,0.12)", marginBottom: "16px" }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.7, color: "#9B9B9B" }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", padding: "24px 32px", background: "rgba(197,165,90,0.04)", border: "1px solid rgba(197,165,90,0.12)", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "3px", height: "32px", background: "#C5A55A", flexShrink: 0 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 300, color: "#9B9B9B", lineHeight: 1.6 }}>
              <strong style={{ fontWeight: 600, color: "#fff" }}>Confidentiality Notice.</strong> All mandate information is strictly confidential. Access to full deal documentation, financial models, and information memoranda is subject to NDA execution and AML/KYC clearance. Ascension Capital Partners | ACN 674 649 417
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{
        borderTop: "1px solid rgba(197,165,90,0.1)",
        background: "rgba(197,165,90,0.02)",
        padding: "120px 80px",
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px" }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C5A55A", marginBottom: "20px" }}>
              — Contact
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: "32px", color: "#fff" }}>
              Initiate a<br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#9B9B9B" }}>Confidential Dialogue</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "#9B9B9B", marginBottom: "48px" }}>
              All enquiries are treated with strict confidentiality. Initial engagements typically involve an NDA, mandate discussion, and KYC intake. We respond within one business day.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { label: "Email", value: "josh.t@ascensionenergies.com" },
                { label: "Entity", value: "Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd" },
                { label: "ACN", value: "674 649 417" },
                { label: "Jurisdiction", value: "New South Wales, Australia" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C5A55A" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 300, color: "#fff" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{ padding: "48px", background: "rgba(197,165,90,0.06)", borderLeft: "3px solid #C5A55A", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "400px" }}>
                <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "28px", fontWeight: 600, color: "#C5A55A", marginBottom: "16px" }}>
                  Enquiry Received
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 300, color: "#9B9B9B", lineHeight: 1.7 }}>
                  Thank you. Your enquiry has been received and will be reviewed by Joshua Ting directly. You can expect a response within one business day. All communications are treated with strict confidentiality.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <input
                    className="contact-input"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    className="contact-input"
                    placeholder="Company / Organisation"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <input
                  className="contact-input"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <textarea
                  className="contact-input"
                  placeholder="Nature of enquiry — transaction type, quantum, jurisdiction, and timeline"
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ resize: "vertical" }}
                  required
                />
                <button type="submit" style={{
                  background: "#C5A55A", color: "#000", fontFamily: "'Inter', sans-serif",
                  fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "18px 40px", border: "none", cursor: "pointer",
                  alignSelf: "flex-start", transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#d4b46a")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#C5A55A")}
                >
                  Submit Enquiry
                </button>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9B9B9B", lineHeight: 1.6 }}>
                  By submitting this form, you acknowledge that your enquiry will be reviewed by Ascension Capital Partners. All information is treated in strict confidence.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(197,165,90,0.15)",
        padding: "40px 80px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px",
      }}>
        <div>
          <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>
            Ascension Capital Partners
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#9B9B9B" }}>
            t/a APEX Consulting Partners Pty Ltd | ACN 674 649 417 | NSW, Australia
          </div>
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#9B9B9B", textAlign: "right", lineHeight: 1.6 }}>
          © {new Date().getFullYear()} Ascension Capital Partners. All rights reserved.<br />
          This website is for institutional and professional use only.
        </div>
      </footer>

    </div>
  );
}
