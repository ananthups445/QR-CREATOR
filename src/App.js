import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

import { excelDateToISO, detectColumn } from './helpers';
import OfferCard from './components/OfferCard';
import UploadPage from './pages/UploadPage';
import ReviewPage from './pages/ReviewPage';
import CardsPage from './pages/CardsPage';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  useLocation(); // keep router context

  const [entries, setEntries]           = useState([]);
  const [qrMap, setQrMap]               = useState({});
  const [globalFrom, setGlobalFrom]     = useState('');
  const [globalTo, setGlobalTo]         = useState('');
  const [columnInfo, setColumnInfo]     = useState(null); // eslint-disable-line no-unused-vars
  const [status, setStatus]             = useState(null);
  const [fileName, setFileName]         = useState('');
  const [genProgress, setGenProgress]   = useState(0); // eslint-disable-line no-unused-vars
  const [generating, setGenerating]     = useState(false);
  const [downloading, setDownloading]   = useState(false);
  const [dragging, setDragging]         = useState(false);

  const hiddenRefs  = useRef({});
  const fileInputRef = useRef();

  const processFile = useCallback(async (file) => {
    if (!file) return;
    setStatus(null);
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { cellDates: false });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

      if (!rows.length) {
        setStatus({ type: 'error', msg: 'The file is empty or has no data rows.' });
        return;
      }

      const allKeys = Object.keys(rows[0]);
      const codeCol = detectColumn(allKeys, ['code','couponcode','coupon','offercode','id','vouchercode','voucher']);
      const fromCol = detectColumn(allKeys, ['validfrom','from','startdate','start','datefrom','validitystart','fromdate']);
      const toCol   = detectColumn(allKeys, ['validto','to','enddate','end','dateto','validityend','todate','expirydate','expiry']);

      if (!codeCol) {
        setStatus({ type: 'error', msg: `Could not detect a code column. Columns found: ${allKeys.join(', ')}. Please rename your code column to "Code".` });
        return;
      }

      const parsed = rows
        .map(r => ({
          code:      String(r[codeCol] || '').trim(),
          validFrom: fromCol ? excelDateToISO(r[fromCol]) : '',
          validTo:   toCol   ? excelDateToISO(r[toCol])   : '',
        }))
        .filter(r => r.code);

      setEntries(parsed);
      setQrMap({});
      setColumnInfo({ codeCol, fromCol, toCol, allKeys });
      setStatus({
        type: 'success',
        msg: `${parsed.length} code${parsed.length !== 1 ? 's' : ''} loaded from "${file.name}".${!fromCol ? ' No date columns detected — use the date fields below.' : ''}`,
      });
      setFileName(file.name);
    } catch (err) {
      setStatus({ type: 'error', msg: `Failed to read file: ${err.message}` });
    }
  }, []);  // no navigate dependency — user clicks Proceed to navigate

  const onProceed = useCallback(() => {
    navigate('/review');
  }, [navigate]);

  const onReset = useCallback(() => {
    setEntries([]);
    setQrMap({});
    setColumnInfo(null);
    setStatus(null);
    setFileName('');
    setGlobalFrom('');
    setGlobalTo('');
  }, []);

  const [pendingDownload, setPendingDownload] = useState(null);

  const captureCard = useCallback(async (code) => {
    const el = hiddenRefs.current[code];
    if (!el) return null;
    return html2canvas(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false });
  }, []);

  const downloadCard = useCallback(async (code, fmt = 'png') => { // eslint-disable-line no-use-before-define
    const canvas = await captureCard(code);
    if (!canvas) return;
    const blob = await new Promise(res => canvas.toBlob(res, fmt === 'jpg' ? 'image/jpeg' : 'image/png', 0.95));
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: `KMRL_Offer_${code}.${fmt}` }).click();
    URL.revokeObjectURL(url);
  }, [captureCard]);

  useEffect(() => {
    if (!pendingDownload) return;
    const { code } = pendingDownload;
    if (!qrMap[code]) return;
    const timer = setTimeout(async () => {
      await downloadCard(code, 'png');
      setPendingDownload(null);
    }, 120);
    return () => clearTimeout(timer);
  }, [pendingDownload, qrMap, downloadCard]);

  const generateOneAndDownload = useCallback(async (entry) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(entry.code, {
        errorCorrectionLevel: 'H', width: 400, margin: 2,
        color: { dark: '#000000', light: '#FFFFFF' },
      });
      setQrMap(prev => ({ ...prev, [entry.code]: qrDataUrl }));
      setPendingDownload({ code: entry.code });
    } catch (err) { console.error(err); }
  }, []);

  const generateQRCodes = useCallback(async (targetCodes) => {
    const list = targetCodes || entries.map(e => e.code);
    if (!list.length) return;
    setGenerating(true);
    setGenProgress(0);
    const map = { ...qrMap };
    for (let i = 0; i < list.length; i++) {
      try {
        map[list[i]] = await QRCode.toDataURL(list[i], {
          errorCorrectionLevel: 'H', width: 400, margin: 2,
          color: { dark: '#000000', light: '#FFFFFF' },
        });
      } catch (err) { console.error(err); }
      setGenProgress(Math.round(((i + 1) / list.length) * 100));
    }
    setQrMap(map);
    setGenerating(false);
    if (targetCodes === null) navigate('/cards');
  }, [entries, qrMap, navigate]);

  const resolveEntry = useCallback((entry) => ({
    ...entry,
    validFrom: entry.validFrom || globalFrom,
    validTo:   entry.validTo   || globalTo,
  }), [globalFrom, globalTo]);

  const downloadAll = useCallback(async (fmt = 'png') => {
    if (!entries.length) return;
    setDownloading(true);
    const zip = new JSZip();
    for (const entry of entries) {
      const canvas = await captureCard(entry.code);
      if (!canvas) continue;
      const blob = await new Promise(res => canvas.toBlob(res, fmt === 'jpg' ? 'image/jpeg' : 'image/png', 0.95));
      zip.file(`KMRL_Offer_${entry.code}.${fmt}`, blob);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    Object.assign(document.createElement('a'), { href: url, download: `KMRL_OfferCodes_${new Date().toISOString().slice(0,10)}.zip` }).click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  }, [entries, captureCard]);

  return (
    <div className="app">

      <Routes>
        <Route path="/" element={
          <UploadPage
            processFile={processFile}
            status={status}
            dragging={dragging}
            setDragging={setDragging}
            fileInputRef={fileInputRef}
            entriesReady={entries.length > 0}
            fileName={fileName}
            entryCount={entries.length}
            onProceed={onProceed}
            onReset={onReset}
          />
        } />

        <Route path="/review" element={
          <ReviewPage
            entries={entries}
            globalTo={globalTo}
            generateQRCodes={generateQRCodes}
            generateOneAndDownload={generateOneAndDownload}
            generating={generating}
            qrMap={qrMap}
            clearStatus={() => setStatus(null)}
          />
        } />

        <Route path="/cards" element={
          <CardsPage
            entries={entries}
            qrMap={qrMap}
            resolveEntry={resolveEntry}
            downloadCard={downloadCard}
            downloadAll={downloadAll}
            downloading={downloading}
          />
        } />
      </Routes>

      <div className="hidden-render" aria-hidden="true">
        {entries.map(entry => (
          <div key={entry.code} ref={el => { hiddenRefs.current[entry.code] = el; }}>
            <OfferCard entry={resolveEntry(entry)} qrDataUrl={qrMap[entry.code]} />
          </div>
        ))}
      </div>

    </div>
  );
}
