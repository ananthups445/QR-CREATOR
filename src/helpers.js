import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

export function excelDateToISO(val) {
  if (!val && val !== 0) return '';
  if (typeof val === 'number') {
    try {
      const p = XLSX.SSF.parse_date_code(val);
      if (p) return `${p.y}-${String(p.m).padStart(2,'0')}-${String(p.d).padStart(2,'0')}`;
    } catch (_) {}
  }
  const str = String(val).trim();
  // Handle dd/mm/yyyy or dd-mm-yyyy
  const dmyMatch = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmyMatch) {
    const [, d, m, y] = dmyMatch;
    return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
  }
  // Handle yyyy/mm/dd or yyyy-mm-dd
  const d = new Date(str);
  return isNaN(d.getTime()) ? str : d.toISOString().slice(0, 10);
}

export function detectColumn(keys, candidates) {
  return keys.find(k => candidates.some(c => k.toLowerCase().replace(/[\s_-]/g, '') === c));
}

const HEADER_COLOR = '00B5A5'; // primary teal (no # for ARGB)
const THIN_BORDER  = { style: 'thin', color: { argb: 'FFB2E0DC' } };
const ALL_BORDERS  = { top: THIN_BORDER, left: THIN_BORDER, bottom: THIN_BORDER, right: THIN_BORDER };

export async function downloadTemplate() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'KMRL Offer Card Generator';
  const ws = wb.addWorksheet('Offer Codes');

  ws.columns = [
    { key: 'slno',      width: 9  },
    { key: 'code',      width: 24 },
    { key: 'validFrom', width: 16 },
    { key: 'validTo',   width: 16 },
  ];

  // Header row
  const headerRow = ws.addRow(['Sl No', 'Code', 'Valid From', 'Valid To']);
  headerRow.height = 22;
  headerRow.eachCell(cell => {
    cell.fill   = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + HEADER_COLOR } };
    cell.font   = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = ALL_BORDERS;
  });

  // 50 data rows
  for (let i = 1; i <= 50; i++) {
    const row = ws.addRow([i, '', '', '']);
    row.height = 18;
    row.eachCell({ includeEmpty: true }, (cell, colNum) => {
      cell.border = ALL_BORDERS;
      if (colNum === 1) {
        cell.alignment = { horizontal: 'center' };
        cell.font = { color: { argb: 'FF888888' } };
      }
    });
  }

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  Object.assign(document.createElement('a'), {
    href: url,
    download: 'KMRL_OfferCodes_Template.xlsx',
  }).click();
  URL.revokeObjectURL(url);
}
