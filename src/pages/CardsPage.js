import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KmrlLogo from '../KMRL-logo.png';
import OfferCard from '../components/OfferCard';

const PER_PAGE = 12;

const IcoBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IcoDl = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IcoChevronL = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IcoChevronR = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

export default function CardsPage({ entries, qrMap, resolveEntry, downloadCard, downloadAll, downloading }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const CARD_W = 630;
  const PREV_W = 190;
  const scale  = PREV_W / CARD_W;
  const PREV_H = Math.round(PREV_W * (1448 / 1086));

  const generatedCount = Object.keys(qrMap).length;
  const totalPages = Math.ceil(entries.length / PER_PAGE);
  const pageEntries = entries.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goPage = (p) => { setPage(Math.max(1, Math.min(p, totalPages))); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="review-shell">

      {/* Top bar — mirrors ReviewPage */}
      <div className="review-topnav">
        <div className="review-topnav-logo">
          <img src={KmrlLogo} alt="Kochi Metro" />
        </div>
        <div className="inline-steps">
          <div className="inline-step done">
            <div className="inline-step-circle done"><IcoCheck /></div>
            <span>Upload File</span>
          </div>
          <div className="inline-step-line" />
          <div className="inline-step done">
            <div className="inline-step-circle done"><IcoCheck /></div>
            <span>Parsed Data</span>
          </div>
          <div className="inline-step-line" />
          <div className="inline-step active">
            <div className="inline-step-circle active">3</div>
            <span>Generate Cards</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <IcoBack /> Back
        </button>
      </div>

      {/* Content */}
      <div className="review-content">

        {/* Header + bulk download */}
        <div className="page-header-row" style={{ marginBottom: 20 }}>
          <div>
            <div className="page-title">Generated Cards</div>
            <div className="page-subtitle">{generatedCount} card{generatedCount !== 1 ? 's' : ''} generated successfully.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => downloadAll('png')} disabled={downloading || !generatedCount}>
              <IcoDl /> {downloading ? 'Preparing…' : 'Download All PNG'}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => downloadAll('jpg')} disabled={downloading || !generatedCount}>
              <IcoDl /> {downloading ? 'Preparing…' : 'Download All JPG'}
            </button>
          </div>
        </div>

        {/* Card tiles grid */}
        <div className="cp-grid">
          {pageEntries.map(entry => {
            const resolved = resolveEntry(entry);
            const hasQR = !!qrMap[entry.code];
            return (
              <div key={entry.code} className="cp-tile">
                <div className="cp-preview" style={{ width: PREV_W, height: PREV_H }}>
                  {hasQR ? (
                    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: CARD_W, pointerEvents: 'none' }}>
                      <OfferCard entry={resolved} qrDataUrl={qrMap[entry.code]} />
                    </div>
                  ) : (
                    <div className="cp-no-qr">No QR</div>
                  )}
                  {hasQR && (
                    <div className="cp-hover-actions">
                      <button className="cp-float-btn" onClick={() => downloadCard(entry.code, 'png')}>
                        <IcoDl /> PNG
                      </button>
                      <button className="cp-float-btn primary" onClick={() => downloadCard(entry.code, 'jpg')}>
                        <IcoDl /> JPG
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="cp-pagination">
            <span className="cp-page-info">
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, entries.length)} of {entries.length}
            </span>
            <div className="cp-page-btns">
              <button className="cp-pg-btn" onClick={() => goPage(page - 1)} disabled={page === 1}><IcoChevronL /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === '…'
                    ? <span key={`e${idx}`} className="cp-pg-ellipsis">…</span>
                    : <button key={p} className={`cp-pg-btn${p === page ? ' active' : ''}`} onClick={() => goPage(p)}>{p}</button>
                )}
              <button className="cp-pg-btn" onClick={() => goPage(page + 1)} disabled={page === totalPages}><IcoChevronR /></button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
