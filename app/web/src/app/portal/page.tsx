'use client';
import { useState } from 'react';
import styles from './portal.module.css';

export default function PortalLoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/v1/auth/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBg}/>
      <div className={styles.loginBgScrim}/>

      <div className={styles.loginBox}>
        <div className={styles.loginMark}>
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9A7B2E"/>
                <stop offset="0.5" stopColor="#C9A84C"/>
                <stop offset="1" stopColor="#E2C97E"/>
              </linearGradient>
            </defs>
            <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="url(#g)" strokeWidth="1.5"/>
            <polygon points="32,12 48,22 48,42 32,52 16,42 16,22" fill="none" stroke="url(#g)" strokeWidth="1" opacity="0.6"/>
            <path d="M32 18 L42 44 L32 38 L22 44 Z" fill="url(#g)"/>
          </svg>
        </div>

        <div className={styles.loginEyebrow}>LP Investor Portal</div>
        <h1 className={styles.loginTitle}>Ascension Capital Partners</h1>
        <p className={styles.loginSub}>Secure access for limited partners. Enter your registered email address to receive a one-time login link.</p>

        {status === 'sent' ? (
          <div className={styles.loginSent}>
            <div className={styles.sentIcon}>✓</div>
            <div className={styles.sentTitle}>Link sent.</div>
            <p className={styles.sentBody}>
              If your email is registered, you&apos;ll receive a secure access link within 60 seconds.
              Check your inbox and spam folder.
            </p>
          </div>
        ) : (
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.loginField}>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@firm.com"
                required
                autoFocus
              />
            </div>
            {status === 'error' && (
              <div className={styles.loginError}>
                Unable to send link. Please try again or contact your relationship manager.
              </div>
            )}
            <button type="submit" className={styles.loginBtn} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send access link →'}
            </button>
          </form>
        )}

        <div className={styles.loginDisclaimer}>
          This portal is restricted to qualified limited partners of Ascension Capital Partners.
          Unauthorised access is prohibited.
        </div>
      </div>
    </div>
  );
}
