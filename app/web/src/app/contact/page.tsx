'use client';
import { useState } from 'react';
import type { Metadata } from 'next';
import styles from './contact.module.css';

const ENGAGEMENT_TYPES = [
  'Mandate enquiry (sponsor)',
  'Allocation interest (LP/investor)',
  'Strategic partnership',
  'Advisory enquiry',
  'Other (institutional)',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', firm: '', role: '', email: '', phone: '', engagement: '', message: '', consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'domain'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const domain = form.email.split('@')[1] || '';
    const freeMailers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    if (freeMailers.includes(domain)) {
      setStatus('domain');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPeak}/>
        <div className={styles.heroPeakScrim}/>
        <div className={styles.heroInner}>
          <div className="eyebrow"><span className="rule"/>Contact · Principal-to-Principal</div>
          <h1 className={styles.heroTitle}>Let&apos;s talk.</h1>
          <p className={styles.heroSub}>
            We respond to every qualified institutional enquiry within 48 hours.
            If you are a sponsor seeking capital, an allocator seeking mandates,
            or a strategic partner seeking alliance — reach out.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={styles.grid}>
          {/* Form */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="rule"/><span className="num">01</span> · Enquiry Form
            </div>

            {status === 'success' ? (
              <div className={styles.statusCard} style={{ borderColor: 'var(--acp-success)' }}>
                <div className={styles.statusDot} style={{ color: 'var(--acp-success)' }}>●</div>
                <div>
                  <div className={styles.statusTitle}>Received.</div>
                  <div className={styles.statusMsg}>
                    We respond to qualified institutional enquiries within 48 hours.
                  </div>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Name · Required</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" required/>
                  </div>
                  <div className={styles.field}>
                    <label>Firm · Required</label>
                    <input value={form.firm} onChange={e => setForm({...form, firm: e.target.value})} placeholder="Institution" required/>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Role · Required</label>
                    <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Title" required/>
                  </div>
                  <div className={styles.field}>
                    <label>Email · Required · firm domain only</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@firm.com" required/>
                    {status === 'domain' && (
                      <div className={styles.fieldError}>Institutional email addresses only. Please use your firm domain.</div>
                    )}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Phone · Optional</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+ country · mobile"/>
                  </div>
                  <div className={styles.field}>
                    <label>Engagement Type · Required</label>
                    <select value={form.engagement} onChange={e => setForm({...form, engagement: e.target.value})} required>
                      <option value="">Select one</option>
                      {ENGAGEMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Message · 140–500 chars · Required</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Brief description of mandate, allocation interest, or strategic context. We read every enquiry."
                    minLength={140}
                    maxLength={500}
                    required
                    rows={5}
                  />
                </div>
                <div className={styles.consent}>
                  <div
                    className={`${styles.box} ${form.consent ? styles.checked : ''}`}
                    onClick={() => setForm({...form, consent: !form.consent})}
                  />
                  <div>
                    <strong>Confidentiality acknowledgement.</strong><br/>
                    I confirm this enquiry is made in a professional capacity and consent to
                    confidential handling under ACP standard terms.
                  </div>
                </div>
                {status === 'error' && (
                  <div className={styles.statusCard} style={{ borderColor: 'var(--acp-error)', marginBottom: 16 }}>
                    <div style={{ color: 'var(--acp-error)' }}>The enquiry didn&apos;t reach us. Please try again, or email directly.</div>
                  </div>
                )}
                <div className={styles.formFooter}>
                  <span className={styles.formNote}>All fields marked required</span>
                  <button
                    type="submit"
                    className="btn btnPrimary"
                    disabled={status === 'submitting' || !form.consent}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Submit enquiry →'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="rule"/><span className="num">02</span> · Direct
            </div>
            <div className="factCard" style={{ padding: 28 }}>
              <div className="factLabel">Executive Managing Partner</div>
              <div className={styles.contactName}>Joshua Ting</div>
              <div className={styles.contactRole}>Global Head of Alternatives &amp; Private Markets</div>
              <div className="factRow">
                <span className="k">Mobile</span>
                <span className="v" style={{ fontFamily: 'var(--font-mono)' }}>+61 451 338 533</span>
              </div>
              <div className="factRow">
                <span className="k">Email</span>
                <span className="v" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>joshuating53@outlook.com</span>
              </div>
            </div>
            <div className="factCard" style={{ padding: 28, marginTop: 20 }}>
              <div className="factLabel">Registered Office</div>
              <div className={styles.address}>
                Ascension Capital Partners<br/>
                t/a APEX Consulting Partners Pty Ltd<br/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--acp-gold-light)' }}>ACN 674 649 417</span><br/><br/>
                Suite 3, 1 Cary Street<br/>
                Drummoyne NSW 2047<br/>
                Australia
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
