import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export const isDef = (x: unknown): boolean => x !== undefined && x !== null

// Type Guards
export const isArray = (x: unknown): x is unknown[] => {
  return Array.isArray(x)
}

export const isDate = (x: unknown): x is Date => {
  return x instanceof Date
}

// TODO: Narrow type
function s2ab(s: any) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

// Refer to https://github.com/SheetJS/sheetjs/issues/817#issuecomment-331605640
// TODO: Narrow type
export const saveJsonAsXlsx = (
  data: any,
  filename: string,
  sheetname: string,
): void => {
  // make the worksheet
  const ws = XLSX.utils.json_to_sheet(data)

  // add to workbook
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetname)

  // write workbook (use type 'binary')
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })

  saveAs(
    new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
    filename,
  )
}
