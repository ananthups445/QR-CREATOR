import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KmrlLogo from '../KMRL-logo.png';

const fmtDate = (v) => {
  if (!v) return '';
  const d = new Date(v);
  if (isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const IcoBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IcoDl = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
const IcoChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function ReviewPage({ entries, globalTo, generateQRCodes, generateOneAndDownload, generating, qrMap, clearStatus }) {
  const navigate = useNavigate();
  const [rowGenerating, setRowGenerating] = useState(null);

  const handleGenerateAll = () => generateQRCodes(null);

  const handleGenerateOne = async (entry) => {
    setRowGenerating(entry.code);
    await generateOneAndDownload(entry);
    setRowGenerating(null);
  };

  return (
    <div className="review-shell">

      {/* Top bar: logo + steps + back */}
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
          <div className="inline-step active">
            <div className="inline-step-circle active">2</div>
            <span>Parsed Data</span>
          </div>
          <div className="inline-step-line" />
          <div className="inline-step">
            <div className="inline-step-circle">3</div>
            <span>Generate Cards</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => { clearStatus(); navigate('/'); }}>
          <IcoBack /> Back
        </button>
      </div>

      {/* Page content */}
      <div className="review-content">
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="page-title">Parsed Data</div>
            <div className="page-subtitle">Review the extracted promotional codes before generating cards.</div>
          </div>
        </div>

        <div className="table-card">
          <div className="table-scroll">
            <table className="rv-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Promotional Code</th>
                  <th>Valid From</th>
                  <th>Valid Till</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.slice(0, 250).map((e, i) => {
                  const done = !!qrMap[e.code];
                  const busy = rowGenerating === e.code;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><span className="code-badge">{e.code}</span></td>

                      <td>
                        {e.validFrom
                          ? <span className="date-val">{fmtDate(e.validFrom)}</span>
                          : <span className="date-empty">—</span>}
                      </td>
                      <td>
                        {e.validTo
                          ? <span className="date-val">{fmtDate(e.validTo)}</span>
                          : globalTo
                            ? <span className="date-global">{fmtDate(globalTo)}</span>
                            : <span className="date-empty">—</span>}
                      </td>
                      <td>
                        <button
                          className={`row-gen-btn${done ? ' done' : ''}`}
                          onClick={() => handleGenerateOne(e)}
                          disabled={busy || generating}
                        >
                          <IcoDl /> {busy ? 'Generating�' : 'Generate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="table-footer-bar">
            <span className="footer-count">Showing 1 to {Math.min(entries.length, 250)} of {entries.length} entries</span>
            <div className="footer-actions">
              <button
                className="btn btn-primary btn-sm gen-all-btn"
                onClick={handleGenerateAll}
                disabled={!entries.length || generating}
              >
                {generating
                  ? <><span className="spinner" /> Generating�</>
                  : <>Generate All</>}
                <span className="gen-all-divider" /><IcoChevron />
              </button>
            </div>
          </div>
          <div className="footer-note">This will generate cards for all valid codes</div>
        </div>
      </div>
    </div>
  );
}