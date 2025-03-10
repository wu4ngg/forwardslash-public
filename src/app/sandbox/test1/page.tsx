"use client";
import Button from "@/widgets/button";
import React from "react";
import XLSX, { BookType } from "xlsx";
export default function Test1() {
  const [__html, setHtml] = React.useState("");
  const [exportType, setExportType] = React.useState<BookType>("xlsx");
  async function handleExcelPreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    const data = await file.arrayBuffer();

    /* parse and load first worksheet */
    const wb = XLSX.read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];
    setHtml(XLSX.utils.sheet_to_html(ws, { id: "table" }));
  }
  async function handleExcelExport() {
    const wb = XLSX.utils.table_to_book(document.getElementById("table")!);
    const wbout = XLSX.write(wb, { bookType: exportType, bookSST: true, type: "binary" });
    function s2ab(s: string) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  return (
    <div className="space-y-2">
      <h1>SheetJS Test DX</h1>
      <p>Upload excel, csv, anything</p>
      <input type="file" onChange={handleExcelPreview} />
      <p>Export as</p>
      <div className="flex gap-2">
        <select
          value={exportType}
          onChange={(e) => setExportType(e.target.value as BookType)}
        >
          <option value={"xlsx"}>Excel</option>
          <option value={"csv"}>CSV</option>
        </select>
        <Button variant="secondary" onClick={handleExcelExport}>
          Export
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html }}></div>
    </div>
  );
}
