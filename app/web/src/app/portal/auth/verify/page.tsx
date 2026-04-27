'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import styles from './verify.module.css';

function VerifyInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token found. Please request a new link.');
      return;
    }

    fetch(`/api/v1/auth/verify?token=${encodeURIComponent(token)}`)
      .then(async res => {
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem('acp-portal-token', data.token);
          setStatus('success');
          setTimeout(() => router.replace('/portal/overview'), 800);
        } else {
          setStatus('error');
          setMessage(data.error || 'This link has expired or already been used. Please request a new one.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Unable to verify your link. Please try again.');
      });
  }, [params, router]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.mark}>
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="vg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9A7B2E"/>
                <stop offset="0.5" stopColor="#C9A84C"/>
                <stop offset="1" stopColor="#E2C97E"/>
              </linearGradient>
            </defs>
            <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="url(#vg)" strokeWidth="1.5"/>
            <path d="M32 18 L42 44 L32 38 L22 44 Z" fill="url(#vg)"/>
          </svg>
        </div>

        {status === 'verifying' && (
          <>
            <div className={styles.spinner}/>
            <p className={styles.label}>Verifying your access link&hellip;</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className={styles.iconSuccess}>✓</div>
            <p className={styles.label}>Verified. Redirecting to your portal&hellip;</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className={styles.iconError}>✕</div>
            <p className={styles.labelError}>{message}</p>
            <a href="/portal" className={styles.back}>Return to login</a>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyInner/>
    </Suspense>
  );
}
