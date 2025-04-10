import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import axios from "axios";
import logo from "../assets/epq.png"; 

const ExportButtons = ({ data = [], fechaInicio, fechaFin }) => {
    const [hostname, setHostname] = useState("Cargando...");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchHostname = async () => {
            try {
                const response = await axios.get(`${API_URL}/reporte/maquina`);
                setHostname(response.data.hostname || "Desconocido");
            } catch (error) {
                console.error("Error obteniendo el hostname:", error);
                setHostname("Desconocido");
            }
        };
        fetchHostname();
    }, []);

    const headers = ["No.", "Contenedor", "Movimiento", "Empresa", "Fecha Factura", "No. Factura"];

    const exportToExcel = () => {
        if (!data.length) {
            console.error("No hay datos para exportar.");
            return;
        }

        const ws = XLSX.utils.aoa_to_sheet([
            headers,
            ...data.map((row, index) => [
                index + 1,
                row.CONTENEDOR || "",
                row.MOVIMIENTO || "",
                row.EMPRESA || "",
                row.FECHA_FACTURA || "",
                row.NO_FACTURA || ""
            ])
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte");
        XLSX.writeFile(wb, "Verdes Sin Retención.xlsx");
    };

    const exportToPDF = () => {
        if (!data.length) {
            console.error("No hay datos para exportar.");
            return;
        }

        const doc = new jsPDF();
        doc.addImage(logo, "PNG", 15, 10, 30, 30);

        doc.setFontSize(12);
        doc.text("Empresa Portuaria Quetzal", 60, 15);
        doc.text("Reporte de Contenedores Verdes sin Retención", 60, 22);
        doc.text("Operación: Importación", 60, 29);
        doc.text(`De: ${fechaInicio}  A: ${fechaFin}`, 60, 36);

        autoTable(doc, {
            startY: 50,
            head: [headers],
            body: data.map((row, index) => [
                index + 1,
                row.CONTENEDOR || "",
                row.MOVIMIENTO || "",
                row.EMPRESA || "",
                row.FECHA_FACTURA || "",
                row.NO_FACTURA || ""
            ]),
            theme: "grid"
        });

        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);

            doc.text(
                `${i}/${pageCount}`,
                doc.internal.pageSize.width / 2,
                doc.internal.pageSize.height - 10,
                { align: "center" }
            );
        }

        doc.save("Verdes Sin Retención.pdf");
    };

    return (
        <div className="export-buttons">
            <button onClick={exportToExcel}>Excel</button>
            <button onClick={exportToPDF}>PDF</button>
        </div>
    );
};

export default ExportButtons;
