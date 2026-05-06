const fs = require('fs');
const path = require('path');
const src = (f, c) => fs.writeFileSync(path.join('src', f), c, 'utf8');

// ─── App.css ───────────────────────────────────────────────────────────────
src('App.css', `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --p:#00B5A5;
  --pd:#007A6E;
  --pm:#009B8D;
  --pl:#E8F7F5;
  --border:#DFF0EE;
  --bg:#F6FAFA;
  --white:#fff;
  --text:#111B1A;
  --sub:#526866;
  --dim:#94AFAD;
  --red:#DC2626;
  --green:#15803D;
}

body{
  font-family:'Inter',system-ui,sans-serif;
  background:var(--bg);
  color:var(--text);
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
}

/* ── TOPNAV ── */
.topnav{
  height:56px;
  background:var(--pd);
  display:flex;
  align-items:center;
  padding:0 32px;
  gap:14px;
  position:sticky;
  top:0;
  z-index:200;
}
.topnav-divider{width:1px;height:20px;background:rgba(255,255,255,0.2)}
.topnav-title{color:#fff;font-size:13.5px;font-weight:700;letter-spacing:0.1px}
.topnav-sub{color:rgba(255,255,255,0.45);font-size:10.5px;margin-top:1px}

/* ── STEP BAR ── */
.step-bar{
  background:var(--white);
  border-bottom:1px solid var(--border);
  height:44px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:0;
}
.step-item{
  display:flex;align-items:center;gap:7px;
  padding:0 18px;height:100%;
  font-size:11.5px;font-weight:600;
  color:var(--dim);cursor:default;
}
.step-item.active{color:var(--pd)}
.step-item.done{color:var(--pm)}
.step-num{
  width:18px;height:18px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:9.5px;font-weight:800;
  background:#E5EDEC;color:var(--dim);flex-shrink:0;
}
.step-item.active .step-num{background:var(--p);color:#fff}
.step-item.done  .step-num{background:var(--pm);color:#fff}
.step-connector{width:28px;height:1px;background:var(--border)}

/* ── UPLOAD / LANDING ── */
.landing{
  min-height:calc(100vh - 56px);
  display:flex;flex-direction:column;align-items:center;
  justify-content:center;
  padding:48px 24px 64px;
  text-align:center;
}
.landing-hero{
  background:var(--white);
  border:1px solid var(--border);
  border-radius:20px;
  padding:48px 56px 40px;
  width:100%;max-width:520px;
  display:flex;flex-direction:column;align-items:center;gap:0;
}
.landing-logo{height:52px;width:auto;margin-bottom:24px}
.landing-title{font-size:22px;font-weight:800;color:var(--text);letter-spacing:-0.3px;margin-bottom:8px}
.landing-sub{font-size:13.5px;color:var(--sub);line-height:1.7;max-width:380px;margin-bottom:28px}

/* drop zone inside hero */
.upload-zone{
  width:100%;
  border:1.5px dashed var(--p);
  border-radius:12px;
  padding:32px 20px;
  cursor:pointer;
  transition:background 0.15s,border-color 0.15s;
  display:flex;flex-direction:column;align-items:center;gap:6px;
}
.upload-zone:hover,.upload-zone.drag{background:var(--pl);border-color:var(--pd)}
.upload-zone-icon{color:var(--p);margin-bottom:6px}
.upload-zone-title{font-size:14px;font-weight:600;color:var(--text)}
.upload-zone-hint{font-size:12px;color:var(--sub)}
.upload-zone-types{display:flex;gap:5px;margin-top:8px}
.ftype{
  font-size:9.5px;font-weight:700;letter-spacing:0.5px;
  padding:2px 8px;border-radius:4px;
  background:var(--pl);color:var(--pd);border:1px solid var(--border);
}

/* file loaded state */
.file-ready{
  width:100%;
  border:1.5px solid var(--p);
  border-radius:12px;
  padding:20px;
  background:var(--pl);
  display:flex;align-items:center;gap:14px;
}
.file-ready-icon{
  width:44px;height:44px;border-radius:10px;
  background:var(--white);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  color:var(--p);flex-shrink:0;
}
.file-ready-info{flex:1;text-align:left}
.file-ready-name{font-size:13px;font-weight:700;color:var(--text);word-break:break-all}
.file-ready-count{font-size:11.5px;color:var(--sub);margin-top:2px}
.file-ready-actions{display:flex;gap:7px;flex-shrink:0}

.hero-divider{width:100%;height:1px;background:var(--border);margin:24px 0}

.tpl-btn{
  display:inline-flex;align-items:center;gap:7px;
  color:var(--pd);font-size:12.5px;font-weight:600;
  background:none;border:none;cursor:pointer;
  padding:4px 0;
  text-decoration:underline;text-underline-offset:3px;
  text-decoration-color:var(--border);
}
.tpl-btn:hover{text-decoration-color:var(--p)}

.how-row{
  display:flex;gap:28px;justify-content:center;
  margin-top:32px;flex-wrap:wrap;
}
.how-item{
  display:flex;flex-direction:column;align-items:center;gap:6px;
  max-width:110px;
}
.how-num{
  width:28px;height:28px;border-radius:50%;
  background:var(--pl);color:var(--pd);
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:800;border:1px solid var(--border);
}
.how-label{font-size:11px;color:var(--sub);text-align:center;line-height:1.4;font-weight:500}

/* status */
.status-msg{
  width:100%;margin-top:12px;
  padding:9px 13px;border-radius:8px;
  font-size:12px;font-weight:500;line-height:1.5;
  text-align:left;
}
.status-msg.success{background:#ECFDF5;color:var(--green);border:1px solid #A7F3D0}
.status-msg.error{background:#FEF2F2;color:var(--red);border:1px solid #FECACA}
.status-msg.info{background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE}

/* ── REVIEW PAGE ── */
.review-page{max-width:1100px;margin:0 auto;padding:32px 28px 72px}

.review-topbar{
  display:flex;align-items:center;gap:12px;
  margin-bottom:24px;flex-wrap:wrap;
}
.review-title{font-size:18px;font-weight:800;color:var(--text);letter-spacing:-0.2px}
.review-subtitle{font-size:12.5px;color:var(--sub);margin-top:2px}
.count-pill{
  margin-left:auto;
  background:var(--pl);color:var(--pd);
  border:1px solid var(--border);
  font-size:12px;font-weight:700;
  padding:5px 14px;border-radius:999px;
  white-space:nowrap;
}
.count-pill b{font-size:15px;font-weight:800;color:var(--p)}

/* generate-all bar */
.gen-bar{
  background:var(--white);
  border:1px solid var(--border);
  border-radius:12px;
  padding:16px 20px;
  display:flex;align-items:center;gap:12px;
  margin-bottom:16px;
  flex-wrap:wrap;
}
.gen-bar-info{flex:1}
.gen-bar-title{font-size:13.5px;font-weight:700;color:var(--text)}
.gen-bar-sub{font-size:11.5px;color:var(--sub);margin-top:2px}
.gen-dates{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}
.gen-date-group{display:flex;flex-direction:column;gap:4px}
.gen-date-label{font-size:10px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:0.5px}
.gen-date-input{
  border:1.5px solid var(--border);border-radius:7px;
  padding:6px 10px;font-size:12.5px;color:var(--text);
  font-family:inherit;outline:none;background:var(--white);
  transition:border-color 0.15s;
}
.gen-date-input:focus{border-color:var(--p)}
.progress-wrap{background:var(--border);border-radius:99px;height:4px;overflow:hidden;margin:6px 0 2px}
.progress-bar{height:100%;background:var(--p);border-radius:99px;transition:width 0.3s}
.progress-label{font-size:10.5px;color:var(--sub);text-align:right}

/* table card */
.table-card{
  background:var(--white);
  border:1px solid var(--border);
  border-radius:12px;
  overflow:hidden;
}
.table-head-row{
  display:flex;align-items:center;
  padding:13px 18px;
  border-bottom:1px solid var(--border);
  gap:10px;flex-wrap:wrap;
}
.table-head-title{font-size:13px;font-weight:700;color:var(--text)}
.col-chips{display:flex;gap:5px;flex-wrap:wrap}
.col-chip{
  display:inline-flex;align-items:center;gap:3px;
  background:var(--bg);border:1px solid var(--border);
  border-radius:4px;padding:2px 8px;
  font-size:10.5px;color:var(--text);font-weight:500;
}
.col-chip span{color:var(--dim);font-weight:400}
.table-scroll{max-height:440px;overflow-y:auto}
.rv-table{width:100%;border-collapse:collapse;font-size:12.5px}
.rv-table thead th{
  background:var(--bg);color:var(--sub);
  padding:9px 16px;text-align:left;
  font-size:10px;font-weight:700;letter-spacing:0.7px;text-transform:uppercase;
  position:sticky;top:0;z-index:1;border-bottom:1px solid var(--border);
}
.rv-table thead th:first-child{width:40px;text-align:center}
.rv-table thead th:last-child{width:100px;text-align:center}
.rv-table tbody tr:hover td{background:#F0FAF8}
.rv-table td{padding:9px 16px;border-bottom:1px solid var(--border);vertical-align:middle}
.rv-table tr:last-child td{border-bottom:none}
.rv-table td:first-child{text-align:center;color:var(--dim);font-size:11px}
.rv-table td:last-child{text-align:center}
.code-badge{
  display:inline-block;
  background:var(--pl);color:var(--pd);
  font-family:'SF Mono','Fira Code','Courier New',monospace;
  font-weight:700;font-size:11.5px;letter-spacing:0.8px;
  padding:3px 9px;border-radius:5px;border:1px solid var(--border);
}
.date-val{color:var(--text);font-size:12px}
.date-empty{color:var(--dim)}
.date-global{color:var(--pm);font-weight:600;font-size:12px}
.global-tag{
  font-size:8.5px;font-weight:700;letter-spacing:0.4px;
  background:var(--pl);color:var(--pm);border:1px solid var(--border);
  border-radius:3px;padding:1px 4px;vertical-align:middle;margin-left:3px;
}
.warn-note{color:#D97706}
.table-footer{
  padding:9px 18px;border-top:1px solid var(--border);
  background:var(--bg);
  display:flex;gap:16px;font-size:11px;color:var(--sub);font-weight:500;flex-wrap:wrap;
}

/* per-row generate btn */
.row-gen-btn{
  display:inline-flex;align-items:center;gap:4px;
  font-size:11px;font-weight:600;
  background:var(--pl);color:var(--pd);
  border:1px solid var(--border);border-radius:5px;
  padding:4px 10px;cursor:pointer;
  transition:background 0.12s,border-color 0.12s;
  white-space:nowrap;
}
.row-gen-btn:hover:not(:disabled){background:var(--p);color:#fff;border-color:var(--p)}
.row-gen-btn:disabled{opacity:0.4;cursor:default}
.row-gen-btn.done{background:#ECFDF5;color:var(--green);border-color:#A7F3D0}

/* ── CARDS PAGE ── */
.cards-page{max-width:1280px;margin:0 auto;padding:28px 28px 64px}
.cards-topbar{
  display:flex;align-items:center;gap:10px;
  padding-bottom:20px;margin-bottom:24px;
  border-bottom:1px solid var(--border);
  flex-wrap:wrap;
}
.cards-topbar-left{flex:1}
.cards-title{font-size:18px;font-weight:800;color:var(--text);letter-spacing:-0.2px;margin-bottom:4px}
.cards-sub{font-size:12.5px;color:var(--sub)}
.cards-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.divider-v{width:1px;height:22px;background:var(--border)}

.cards-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:20px;
}
.card-tile{
  background:var(--white);
  border:1px solid var(--border);
  border-radius:12px;
  overflow:hidden;
  transition:box-shadow 0.18s,transform 0.18s;
}
.card-tile:hover{box-shadow:0 6px 24px rgba(0,123,110,0.1);transform:translateY(-2px)}
.card-preview{overflow:hidden;width:100%;position:relative;background:#f5f5f5}
.card-footer{
  padding:10px 12px;
  border-top:1px solid var(--border);
  background:var(--bg);
  display:flex;align-items:center;justify-content:space-between;gap:8px;
}
.card-code{
  font-family:'SF Mono','Fira Code','Courier New',monospace;
  font-size:10.5px;font-weight:600;color:var(--sub);
  letter-spacing:0.8px;overflow:hidden;text-overflow:ellipsis;
  white-space:nowrap;max-width:140px;
}
.card-dl-btns{display:flex;gap:5px}

/* ── BUTTONS ── */
.btn{
  display:inline-flex;align-items:center;justify-content:center;
  gap:6px;padding:9px 18px;
  border:none;border-radius:8px;
  font-size:13px;font-weight:600;font-family:inherit;
  cursor:pointer;white-space:nowrap;
  transition:all 0.14s;
}
.btn:disabled{opacity:0.4;cursor:not-allowed;transform:none!important}
.btn-primary{background:var(--pd);color:#fff}
.btn-primary:hover:not(:disabled){background:var(--p);transform:translateY(-1px)}
.btn-secondary{background:var(--white);color:var(--text);border:1.5px solid var(--border)}
.btn-secondary:hover:not(:disabled){background:var(--pl);border-color:var(--p);color:var(--pd)}
.btn-accent{background:var(--p);color:#fff}
.btn-accent:hover:not(:disabled){background:var(--pm);transform:translateY(-1px)}
.btn-ghost{background:transparent;color:var(--sub);border:1.5px solid var(--border)}
.btn-ghost:hover:not(:disabled){background:var(--pl);color:var(--pd);border-color:var(--p)}
.btn-outline{background:transparent;color:var(--pd);border:1.5px solid var(--border)}
.btn-outline:hover:not(:disabled){border-color:var(--p);background:var(--pl)}
.btn-sm{padding:5px 13px;font-size:11.5px;border-radius:6px}
.btn-full{width:100%}

/* ── SPINNER ── */
.spinner{
  display:inline-block;width:12px;height:12px;
  border:1.5px solid rgba(255,255,255,0.3);
  border-top-color:#fff;border-radius:50%;
  animation:spin 0.65s linear infinite;flex-shrink:0;
}
.spinner-dark{border-color:rgba(0,123,110,0.2);border-top-color:var(--p)}
@keyframes spin{to{transform:rotate(360deg)}}

/* ── HIDDEN RENDER ── */
.hidden-render{position:fixed;left:-99999px;top:0;pointer-events:none;z-index:-1}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .topnav{padding:0 16px}
  .review-page,.cards-page{padding:20px 14px 48px}
  .landing-hero{padding:32px 20px 28px}
  .gen-bar{flex-direction:column;align-items:flex-start}
  .cards-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:480px){
  .cards-grid{grid-template-columns:1fr}
  .how-row{gap:16px}
}
`.trim());

// ─── UploadPage ────────────────────────────────────────────────────────────
src('pages/UploadPage.js', `import React from 'react';
import KmrlLogo from '../KMRL-logo.png';
import { IconUpload, IconFile, IconQr, IconDownload } from '../components/Icons';
import { downloadTemplate } from '../helpers';

const IcoFile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <polyline points="9 15 11 17 15 13"/>
  </svg>
);
const IcoTemplate = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
  </svg>
);
const IcoArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function UploadPage({ processFile, status, dragging, setDragging, fileInputRef, entriesReady, fileName, entryCount, onProceed, onReset }) {
  const handleFile = e => { processFile(e.target.files?.[0]); e.target.value = ''; };
  const handleDrop = e => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files?.[0]); };

  return (
    <div className="landing">
      <div className="landing-hero">
        <img src={KmrlLogo} alt="KMRL" className="landing-logo" />
        <h1 className="landing-title">Offer Card Generator</h1>
        <p className="landing-sub">Upload your Excel file with offer codes to generate branded QR cards in bulk.</p>

        {entriesReady ? (
          <>
            <div className="file-ready">
              <div className="file-ready-icon"><IcoFile /></div>
              <div className="file-ready-info">
                <div className="file-ready-name">{fileName}</div>
                <div className="file-ready-count">{entryCount} offer code{entryCount !== 1 ? 's' : ''} found</div>
              </div>
              <div className="file-ready-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => { onReset(); fileInputRef.current?.click(); }}>Change</button>
                <button className="btn btn-primary btn-sm" onClick={onProceed}>Review <IcoArrow /></button>
              </div>
              <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} style={{ display: 'none' }} />
            </div>
            {status && <div className={\`status-msg \${status.type}\`}>{status.msg}</div>}
          </>
        ) : (
          <>
            <div
              className={\`upload-zone\${dragging ? ' drag' : ''}\`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} style={{ display: 'none' }} />
              <div className="upload-zone-icon"><IconUpload /></div>
              <div className="upload-zone-title">Drop your Excel file here</div>
              <div className="upload-zone-hint">or click to browse</div>
              <div className="upload-zone-types">
                <span className="ftype">XLSX</span>
                <span className="ftype">XLS</span>
                <span className="ftype">CSV</span>
              </div>
            </div>
            {status && <div className={\`status-msg \${status.type}\`}>{status.msg}</div>}
          </>
        )}

        <div className="hero-divider" />

        <button className="tpl-btn" onClick={downloadTemplate}>
          <IcoTemplate /> Download Excel Template
        </button>
      </div>

      <div className="how-row">
        {[
          { n: '1', label: 'Upload Excel with offer codes' },
          { n: '2', label: 'Review data and set dates' },
          { n: '3', label: 'Generate and download QR cards' },
        ].map(({ n, label }) => (
          <div className="how-item" key={n}>
            <div className="how-num">{n}</div>
            <div className="how-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ─── ReviewPage ────────────────────────────────────────────────────────────
src('pages/ReviewPage.js', `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IcoBack = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IcoArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcoGen = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

export default function ReviewPage({ entries, columnInfo, globalFrom, setGlobalFrom, globalTo, setGlobalTo, generateQRCodes, generating, genProgress, qrMap, clearStatus }) {
  const navigate = useNavigate();
  const [rowGenerating, setRowGenerating] = useState(null);

  const handleGenerateAll = () => generateQRCodes(null);

  const handleGenerateOne = async (code) => {
    setRowGenerating(code);
    await generateQRCodes([code]);
    setRowGenerating(null);
  };

  const hasFrom = entries.some(e => e.validFrom);
  const hasTo   = entries.some(e => e.validTo);

  return (
    <div className="review-page">

      <div className="review-topbar">
        <button className="btn btn-ghost btn-sm" onClick={() => { clearStatus(); navigate('/'); }}>
          <IcoBack /> Back
        </button>
        <div>
          <div className="review-title">Review &amp; Configure</div>
          <div className="review-subtitle">Confirm your codes, set validity dates, then generate cards.</div>
        </div>
        <div className="count-pill"><b>{entries.length}</b> code{entries.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Generate-all bar */}
      <div className="gen-bar">
        <div className="gen-bar-info">
          <div className="gen-bar-title">Global Validity Dates</div>
          <div className="gen-bar-sub">Applied to any code that has no date in the Excel file</div>
        </div>
        <div className="gen-dates">
          <div className="gen-date-group">
            <label className="gen-date-label">From</label>
            <input type="date" className="gen-date-input" value={globalFrom} onChange={e => setGlobalFrom(e.target.value)} />
          </div>
          <div className="gen-date-group">
            <label className="gen-date-label">To</label>
            <input type="date" className="gen-date-input" value={globalTo} onChange={e => setGlobalTo(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
          <button
            className="btn btn-primary btn-full"
            onClick={handleGenerateAll}
            disabled={!entries.length || generating}
          >
            {generating
              ? <><span className="spinner" /> Generating… {genProgress}%</>
              : <><IcoGen /> Generate All {entries.length} Cards <IcoArrow /></>
            }
          </button>
          {generating && (
            <>
              <div className="progress-wrap"><div className="progress-bar" style={{ width: genProgress + '%' }} /></div>
              <div className="progress-label">{genProgress}% complete</div>
            </>
          )}
        </div>
      </div>

      {/* Data table */}
      <div className="table-card">
        <div className="table-head-row">
          <div className="table-head-title">Extracted Codes</div>
          {columnInfo && (
            <div className="col-chips">
              <span className="col-chip"><span>Code</span> {columnInfo.codeCol}</span>
              {columnInfo.fromCol && <span className="col-chip"><span>From</span> {columnInfo.fromCol}</span>}
              {columnInfo.toCol   && <span className="col-chip"><span>To</span>   {columnInfo.toCol}</span>}
            </div>
          )}
        </div>

        <div className="table-scroll">
          <table className="rv-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Offer Code</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Generate</th>
              </tr>
            </thead>
            <tbody>
              {entries.slice(0, 200).map((e, i) => {
                const done = !!qrMap[e.code];
                const busy = rowGenerating === e.code;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><span className="code-badge">{e.code}</span></td>
                    <td>
                      {e.validFrom
                        ? <span className="date-val">{e.validFrom}</span>
                        : globalFrom
                          ? <span className="date-global">{globalFrom} <span className="global-tag">global</span></span>
                          : <span className="date-empty">—</span>}
                    </td>
                    <td>
                      {e.validTo
                        ? <span className="date-val">{e.validTo}</span>
                        : globalTo
                          ? <span className="date-global">{globalTo} <span className="global-tag">global</span></span>
                          : <span className="date-empty">—</span>}
                    </td>
                    <td>
                      <button
                        className={\`row-gen-btn\${done ? ' done' : ''}\`}
                        onClick={() => handleGenerateOne(e.code)}
                        disabled={busy || generating}
                      >
                        {busy ? <><span className="spinner spinner-dark" /> Generating</> : done ? 'Regenerate' : <><IcoGen /> Generate</>}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {entries.length > 200 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--dim)', fontStyle: 'italic', padding: 12, fontSize: 11 }}>+ {entries.length - 200} more</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>{hasFrom || globalFrom ? 'Valid From set' : <span className="warn-note">No Valid From — set global date above</span>}</span>
          <span>{hasTo   || globalTo   ? 'Valid To set'   : <span className="warn-note">No Valid To — set global date above</span>}</span>
        </div>
      </div>
    </div>
  );
}
`);

// ─── CardsPage ─────────────────────────────────────────────────────────────
src('pages/CardsPage.js', `import React from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from '../components/OfferCard';

const IcoBack = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IcoDl = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IcoZip = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function CardsPage({ entries, qrMap, resolveEntry, downloadCard, downloadAll, downloading }) {
  const navigate = useNavigate();

  const CARD_W = 630;
  const PREV_W = 260;
  const scale  = PREV_W / CARD_W;
  const PREV_H = Math.round(PREV_W * (1448 / 1086));

  return (
    <div className="cards-page">
      <div className="cards-topbar">
        <div className="cards-topbar-left">
          <div className="cards-title">Generated Cards</div>
          <div className="cards-sub">{entries.length} card{entries.length !== 1 ? 's' : ''} — download individually or as a ZIP</div>
        </div>
        <div className="cards-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
            <IcoBack /> Back
          </button>
          <div className="divider-v" />
          <button className="btn btn-secondary btn-sm" onClick={() => downloadAll('png')} disabled={downloading}>
            {downloading ? <><span className="spinner spinner-dark" /> Preparing…</> : <><IcoZip /> ZIP — PNG</>}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => downloadAll('jpg')} disabled={downloading}>
            {downloading ? '…' : <><IcoZip /> ZIP — JPG</>}
          </button>
        </div>
      </div>

      <div className="cards-grid">
        {entries.map(entry => {
          const resolved = resolveEntry(entry);
          return (
            <div key={entry.code} className="card-tile">
              <div className="card-preview" style={{ height: PREV_H }}>
                <div style={{ transform: \`scale(\${scale})\`, transformOrigin: 'top left', width: CARD_W }}>
                  <OfferCard entry={resolved} qrDataUrl={qrMap[entry.code]} />
                </div>
              </div>
              <div className="card-footer">
                <span className="card-code">{entry.code}</span>
                <div className="card-dl-btns">
                  <button className="btn btn-ghost btn-sm" onClick={() => downloadCard(entry.code, 'png')}>
                    <IcoDl /> PNG
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => downloadCard(entry.code, 'jpg')}>
                    <IcoDl /> JPG
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`);

console.log('All files written.');
