import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GraficaContenedores = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reporte/grafica-verdes`)
        .then((response) => response.json())
            .then((jsonData) => {
                // Agrupar datos por fecha
                setTimeout(function(){}, 2000)
                const groupedData = jsonData.reduce((acc, item) => {
                    const existingEntry = acc.find(entry => entry.FECHA === item.FECHA);
                    if (existingEntry) {
                        existingEntry[item.EMPRESA.trim()] = item.TOTAL_CONTENEDORES;
                    } else {
                        acc.push({
                            FECHA: item.FECHA,
                            [item.EMPRESA.trim()]: item.TOTAL_CONTENEDORES
                        });
                    }
                    return acc;
                }, []);

                setData(groupedData);
            })
            .catch((error) => console.error("Error al obtener datos:", error));
    }, []);

    return (
        <div className="grafica-container">
            <h2>Contenedores movilizados los últimos 7 días</h2>
            <h3>Verdes Sin Retención - Importación</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="FECHA" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="EPQ" fill="#007bff" name="EPQ" />
                    <Bar dataKey="GOGE" fill="#ff7300" name="GOGE" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficaContenedores;
