import React from 'react';
import TemplateImg from '../PROMOCODE_TEMPLATE.png';

/* ─────────────────────────────────────────────────────────────
   OfferCard — uses actual PROMOCODE TEMPLATE.png as base image.
   QR code, offer code text, and validity dates are absolutely
   positioned on top at the exact locations in the template.

   Template native size: 1086 × 1448 px
   Rendered width: 630 px  →  height: 630 × (1448/1086) ≈ 840 px
   All overlays use % so they scale perfectly with the image.
───────────────────────────────────────────────────────────── */

const fmtDate = (v) => {
  if (!v) return '';
  const d = new Date(v);
  if (isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const OfferCard = React.forwardRef(function OfferCard({ entry, qrDataUrl }, ref) {
  const { code, validFrom, validTo } = entry;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: 630,
        fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
        display: 'inline-block',
        lineHeight: 1,
      }}
    >
      {/* ── Base template image ── */}
      <img
        src={TemplateImg}
        alt="Offer Card"
        style={{ width: '100%', display: 'block' }}
      />

      {/* ── QR Code — centred inside the bracket zone ── */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '29.6%',
        transform: 'translateX(-50%)',
        width: '36%',
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {qrDataUrl
          ? <img
              src={qrDataUrl}
              alt="QR Code"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          : <div style={{
              width: '100%', height: '100%',
              border: '2px dashed #B2EBF2',
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#B2EBF2', fontSize: 13,
            }}>
              QR Code
            </div>
        }
      </div>

      {/* ── Offer code text — sits below bottom brackets ── */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '57.5%',
        transform: 'translateX(-50%)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 3,
        color: '#222222',
        fontFamily: "'Courier New', 'Lucida Console', monospace",
        whiteSpace: 'nowrap',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 3,
        padding: '2px 10px',
      }}>
        {code}
      </div>

      {/* ── Valid FROM date — inside the left date box ── */}
      <div style={{
        position: 'absolute',
        left: '17.9%',
        top: '89.25%',
        width: '25%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 600,
        color: '#006978',
        letterSpacing: 0.3,
      }}>
        {fmtDate(validFrom)}
      </div>

      {/* ── Valid TO date — inside the right date box ── */}
      <div style={{
        position: 'absolute',
        left: '59.5%',
        top: '89.25%',
        width: '25%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 600,
        color: '#006978',
        letterSpacing: 0.3,
      }}>
        {fmtDate(validTo)}
      </div>
    </div>
  );
});

export default OfferCard;

