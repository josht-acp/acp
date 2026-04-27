'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from '../portal-pages.module.css';
import ds from './documents.module.css';

interface Document {
  doc_id: string;
  fund_name: string;
  title: string;
  category: string;
  doc_date: string;
  file_size_kb: number | null;
  mime_type: string | null;
}

interface DocsData {
  documents: Document[];
}

const CATEGORY_ORDER = [
  'Financial Statements',
  'Capital Calls',
  'Distributions',
  'Legal',
  'Investor Updates',
  'Tax',
  'Other',
];

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtSize(kb: number | null) {
  if (!kb) return '';
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

function extIcon(mime: string | null) {
  if (!mime) return 'FILE';
  if (mime.includes('pdf')) return 'PDF';
  if (mime.includes('excel') || mime.includes('spreadsheet') || mime.includes('xlsx')) return 'XLSX';
  if (mime.includes('word') || mime.includes('docx')) return 'DOCX';
  return 'FILE';
}

export default function DocumentsPage() {
  const router = useRouter();
  const [data, setData] = useState<DocsData | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('acp-portal-token');
    if (!token) { router.replace('/portal'); return; }

    fetch('/api/v1/lp/documents', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async res => {
        if (res.status === 401) { router.replace('/portal'); return; }
        if (!res.ok) throw new Error();
        setData(await res.json());
      })
      .catch(() => setError('Unable to load documents. Please refresh.'));
  }, [router]);

  async function handleDownload(docId: string, title: string) {
    const token = localStorage.getItem('acp-portal-token');
    if (!token) return;
    setDownloading(docId);
    try {
      const res = await fetch(`/api/v1/lp/documents/${docId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      window.open(url, '_blank');
    } catch {
      alert('Unable to download document. Please try again.');
    } finally {
      setDownloading(null);
    }
  }

  if (error) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>{error}</p></div></div>;
  if (!data) return <div className={s.page}><div className={s.pageInner}><p className={s.empty}>Loading&hellip;</p></div></div>;

  const grouped = CATEGORY_ORDER.reduce<Record<string, Document[]>>((acc, cat) => {
    const docs = data.documents.filter(d => d.category === cat);
    if (docs.length > 0) acc[cat] = docs;
    return acc;
  }, {});

  const uncategorised = data.documents.filter(d => !CATEGORY_ORDER.includes(d.category));
  if (uncategorised.length > 0) grouped['Other'] = [...(grouped['Other'] ?? []), ...uncategorised];

  return (
    <div className={s.page}>
      <div className={s.pageInner}>
        <div className={s.pageHeader}>
          <div className={s.eyebrow}>LP Investor Portal</div>
          <h1 className={s.pageTitle}>Data Room</h1>
        </div>

        <div className={`${s.statsRow} ${s.statsRow3}`} style={{ marginBottom: 32 }}>
          <div className={s.statCard}>
            <div className={s.statLabel}>Total Documents</div>
            <div className={s.statValue}>{data.documents.length}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>Categories</div>
            <div className={s.statValue}>{Object.keys(grouped).length}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>Access Level</div>
            <div className={s.statValue} style={{ fontSize: 18, paddingTop: 4 }}>LP — Full Access</div>
          </div>
        </div>

        {Object.entries(grouped).map(([cat, docs]) => (
          <div key={cat} className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelTitle}>{cat}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--acp-steel)' }}>
                {docs.length} document{docs.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className={s.panelBody} style={{ padding: 0 }}>
              {docs.map((doc, i) => (
                <div
                  key={doc.doc_id}
                  className={ds.docRow}
                  style={{ borderTop: i > 0 ? '1px solid var(--acp-gold-hair)' : 'none' }}
                >
                  <div className={ds.docIcon} data-ext={extIcon(doc.mime_type)}>
                    {extIcon(doc.mime_type)}
                  </div>
                  <div className={ds.docMeta}>
                    <div className={ds.docTitle}>{doc.title}</div>
                    <div className={ds.docSub}>
                      {doc.fund_name} &middot; {fmtDate(doc.doc_date)}
                      {doc.file_size_kb ? ` · ${fmtSize(doc.file_size_kb)}` : ''}
                    </div>
                  </div>
                  <button
                    className={ds.downloadBtn}
                    onClick={() => handleDownload(doc.doc_id, doc.title)}
                    disabled={downloading === doc.doc_id}
                  >
                    {downloading === doc.doc_id ? 'Opening…' : '↓ Download'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {data.documents.length === 0 && (
          <div className={s.empty}>No documents available.</div>
        )}
      </div>
    </div>
  );
}
