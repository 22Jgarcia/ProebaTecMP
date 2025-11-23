
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const exportarExcel = (datos) => {
  const worksheet = XLSX.utils.json_to_sheet(datos);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
  XLSX.writeFile(workbook, "reporte_expedientes.xlsx");
};

export const exportarCSV = (datos) => {
  let csv = "Estado,Cantidad\n";

  datos.forEach((d) => {
    csv += `${d.estado},${d.cantidad}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "reporte_expedientes.csv");
  link.click();
};

export const copiarPortapapeles = async (datos) => {
  let texto = "Estado\tCantidad\n";

  datos.forEach((d) => {
    texto += `${d.estado}\t${d.cantidad}\n`;
  });

  await navigator.clipboard.writeText(texto);
  alert("Datos copiados al portapapeles ✓");
};

export const exportarPDF = (datos) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Reporte de Expedientes por Estado", 14, 20);
  doc.setFontSize(12);

  const tabla = datos.map(d => [d.estado, d.cantidad]);

  autoTable(doc, {
    head: [["Estado", "Cantidad"]],
    body: tabla,
    startY: 30,
  });

  doc.save("reporte_expedientes.pdf");
};
