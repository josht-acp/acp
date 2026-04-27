'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from '../portal-pages.module.css';
import ms from './messages.module.css';

interface Message {
  message_id: string;
  sender_type: 'gp' | 'lp';
  sender_name: string;
  subject: string | null;
  body: string;
  sent_at: string;
  read_at: string | null;
}

interface MessagesData {
  messages: Message[];
}

function fmtDatetime(d: string) {
  return new Date(d).toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function MessagesPage() {
  const router = useRouter();
  const [data, setData] = useState<MessagesData | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Message | null>(null);
  const [composing, setComposing] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('acp-portal-token');
    if (!token) { router.replace('/portal'); return; }

    fetch('/api/v1/lp/messages', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async res => {
        if (res.status === 401) { router.replace('/portal'); return; }
        if (!res.ok) throw new Error();
        const d = await res.json();
        setData(d);
        if (d.messages.length > 0) setSelected(d.messages[0]);
      })
      .catch(() => setError('Unable to load messages. Please refresh.'));
  }, [router]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem('acp-portal-token');
    if (!token) return;
    setSending(true);
    try {
      const res = await fetch('/api/v1/lp/messages', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body }),
      });
      if (!res.ok) throw new Error();
      const msg = await res.json();
      setData(prev => prev ? { messages: [msg, ...prev.messages] } : prev);
      setSelected(msg);
      setComposing(false);
      setSubject('');
      setBody('');
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch {
      alert('Message could not be sent. Please try again.');
    } finally {
      setSending(false);
    }
  }

  if (error) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>{error}</p></div></div>;
  if (!data) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>Loading&hellip;</p></div></div>;

  const unread = data.messages.filter(m => m.sender_type === 'gp' && !m.read_at).length;

  return (
    <div className={s.page}>
      <div className={s.pageInner}>
        <div className={s.pageHeader}>
          <div className={s.eyebrow}>LP Investor Portal</div>
          <h1 className={s.pageTitle}>
            Messages
            {unread > 0 && <span className={ms.unreadBadge}>{unread}</span>}
          </h1>
        </div>

        <div className={ms.layout}>
          {/* Sidebar */}
          <div className={ms.sidebar}>
            <div className={ms.sidebarHead}>
              <span className={ms.sidebarTitle}>Inbox</span>
              <button className={ms.composeBtn} onClick={() => setComposing(true)}>
                + New Message
              </button>
            </div>

            {data.messages.length === 0 ? (
              <div className={ms.emptyList}>No messages yet.</div>
            ) : (
              data.messages.map(m => (
                <button
                  key={m.message_id}
                  className={`${ms.msgItem} ${selected?.message_id === m.message_id ? ms.msgItemActive : ''} ${m.sender_type === 'gp' && !m.read_at ? ms.msgItemUnread : ''}`}
                  onClick={() => { setSelected(m); setComposing(false); }}
                >
                  <div className={ms.msgItemFrom}>
                    {m.sender_type === 'gp' ? 'Ascension Capital Partners' : 'You'}
                  </div>
                  <div className={ms.msgItemSubject}>{m.subject || '(no subject)'}</div>
                  <div className={ms.msgItemDate}>{fmtDatetime(m.sent_at)}</div>
                </button>
              ))
            )}
          </div>

          {/* Main pane */}
          <div className={ms.main}>
            {sent && (
              <div className={ms.sentBanner}>Message sent — your relationship manager will respond within 2 business days.</div>
            )}

            {composing ? (
              <form className={ms.compose} onSubmit={handleSend}>
                <div className={ms.composeHead}>
                  <span className={ms.composeTitle}>New Message</span>
                  <button type="button" className={ms.cancelBtn} onClick={() => setComposing(false)}>Cancel</button>
                </div>
                <div className={ms.composeField}>
                  <label className={ms.composeLabel}>Subject</label>
                  <input
                    className={ms.composeInput}
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Message subject"
                    required
                  />
                </div>
                <div className={ms.composeField}>
                  <label className={ms.composeLabel}>Message</label>
                  <textarea
                    ref={bodyRef}
                    className={ms.composeTextarea}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Write your message here…"
                    rows={10}
                    required
                  />
                </div>
                <button type="submit" className={ms.sendBtn} disabled={sending}>
                  {sending ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            ) : selected ? (
              <div className={ms.thread}>
                <div className={ms.threadHead}>
                  <div className={ms.threadSubject}>{selected.subject || '(no subject)'}</div>
                  <div className={ms.threadMeta}>
                    <span className={ms.threadFrom}>
                      {selected.sender_type === 'gp' ? 'Ascension Capital Partners' : selected.sender_name}
                    </span>
                    <span className={ms.threadDate}>{fmtDatetime(selected.sent_at)}</span>
                  </div>
                </div>
                <div className={ms.threadBody}>{selected.body}</div>
              </div>
            ) : (
              <div className={s.empty}>Select a message or compose a new one.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
