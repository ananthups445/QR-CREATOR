import React from 'react';
import LandingBG from '../landing.png';
import { IconUpload } from '../components/Icons';
import KmrlLogo from '../KMRL-logo.png';

const IcoCloud = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);

const IcoDocument = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
  </svg>
);

const IcoQR = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <line x1="11" y1="8" x2="11" y2="8.01"/>
    <line x1="22" y1="8" x2="22" y2="8.01"/>
    <line x1="11" y1="19" x2="11" y2="19.01"/>
    <line x1="22" y1="19" x2="22" y2="19.01"/>
  </svg>
);

const IcoDownload = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IcoArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const FEATURES = [
  { icon: IcoCloud, title: 'Easy Upload', desc: 'Upload your file containing promotional codes — we parse and validate them for you.' },
  { icon: IcoDocument, title: 'Auto Parse', desc: 'We automatically extract codes and optional validity dates from your spreadsheet.' },
  { icon: IcoQR, title: 'Generate Cards', desc: 'Each code is converted into a scannable QR card ready for printing.' },
  { icon: IcoDownload, title: 'Download Instantly', desc: 'Download cards individually or grab everything as a single ZIP file.' },
];

const downloadTemplate = async () => {
  const ExcelJS = (await import('exceljs')).default;
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Template');

  ws.columns = [
    { header: 'Sl No',      key: 'sl',   width: 10 },
    { header: 'Code',       key: 'code', width: 22 },
    { header: 'Valid From', key: 'from', width: 18 },
    { header: 'Valid To',   key: 'to',   width: 18 },
  ];

  const tealBorder = {
    top:    { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    left:   { style: 'thin', color: { argb: 'FF000000' } },
    right:  { style: 'thin', color: { argb: 'FF000000' } },
  };

  // Style header row
  ws.getRow(1).eachCell(cell => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00B5A5' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = tealBorder;
  });

  // Add 20 empty rows with borders pre-applied
  for (let i = 0; i < 20; i++) {
    const row = ws.addRow(['', '', '', '']);
    row.eachCell({ includeEmpty: true }, cell => {
      cell.border = tealBorder;
    });
  }

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'promotional-codes-template.xlsx';
  link.click();
  URL.revokeObjectURL(url);
};

export default function UploadPage({ processFile, status, dragging, setDragging, fileInputRef, entriesReady, fileName, entryCount, onProceed, onReset }) {
  const handleFile = e => { processFile(e.target.files?.[0]); e.target.value = ''; };
  const handleDrop = e => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files?.[0]); };

  return (
    <div className="landing-new" style={{ backgroundImage: `url(${LandingBG})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>

      {/* Header */}
      <div className="landing-header">
        <div className="landing-logo">
          <img src={KmrlLogo} alt="Kochi Metro" />
        </div>
        <a href="#how-it-works" className="how-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          How it works?
        </a>
      </div>

      <div className="landing-container">
        {/* Left side - Title and Features */}
        <div className="landing-left-new">
          <div className="landing-content-left">
            <h1 className="landing-title-new">Convert Promotional Codes<br />into Smart Travel Cards</h1>
            <p className="landing-desc-new">Upload your promotional code file, and we'll convert each code into a scannable QR card for seamless travel on Kochi Metro.</p>

            {/* Features Grid */}
            <div className="features-grid">
              {FEATURES.map(f => (
                <div className="feature-card" key={f.title}>
                  <div className="feature-card-icon">
                    <f.icon />
                  </div>
                  <div className="feature-card-body">
                    <div className="feature-card-title">{f.title}</div>
                    <div className="feature-card-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Upload */}
        <div className="landing-right-new">
          <div className="upload-card">
            <div
              className={`upload-dropzone${dragging ? ' drag' : ''}${entriesReady ? ' file-ready' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv,.txt" onChange={handleFile} style={{ display: 'none' }} />
              {!entriesReady ? (
                <>
                  <div className="dropzone-icon"><IconUpload /></div>
                  <div className="dropzone-text">Drag & drop your file here</div>
                  <div className="dropzone-or">or</div>
                  <button className="btn btn-primary" onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}>Choose File</button>
                  <div className="dropzone-meta">
                    <span className="dropzone-formats">Supports CSV, XLSX, TXT</span>
                    <span className="dropzone-sep">·</span>
                    <span className="dropzone-size">Max file size: 10MB</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="dropzone-file-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <polyline points="9 15 12 18 15 15"/>
                      <line x1="12" y1="18" x2="12" y2="11"/>
                    </svg>
                  </div>
                  <div className="dropzone-file-name">{fileName}</div>
                  <div className="dropzone-file-count">{entryCount} code{entryCount !== 1 ? 's' : ''} found</div>
                  <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); onReset(); fileInputRef.current?.click(); }}>Change File</button>
                </>
              )}
            </div>
          </div>
          {status && status.type === 'error' && <div className={`status-msg ${status.type}`}>{status.msg}</div>}
          {!entriesReady ? (
            <button className="btn btn-primary btn-action-full" onClick={downloadTemplate}>
              Download Template <IcoArrow />
            </button>
          ) : (
            <button className="btn btn-primary btn-action-full" onClick={onProceed}>
              Proceed <IcoArrow />
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="landing-footer-new">
        <span>© Kochi Metro Rail Limited. All rights reserved.</span>
      </div>

    </div>
  );
}
