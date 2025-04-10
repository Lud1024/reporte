import { useState, useEffect } from "react"; 
import axios from "axios";
import DatePicker from "../components/DatePicker";
import DataTable from "../components/DataTable";
import Loading from "../components/Loading";
import ExportButtons from "../components/ExportButtons";
import GraficaContenedores from "../components/GraficaContenedores";
import logo from "../assets/epq.png";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = useState({ fechaInicio: "", fechaFin: "" });
    const [hostname, setHostname] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false); 

    const API_URL = import.meta.env.VITE_API_URL; 

    // Función para obtener datos desde la API
    const fetchData = async (dates) => {
        console.log("Enviando datos al servidor:", dates);
        setLoading(true);
        setDates(dates);
        setSearchPerformed(true); // Se ha realizado una búsqueda
        try {
            const response = await axios.post(`${API_URL}/reporte/poltt`, dates);
            console.log("Respuesta del servidor:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        setLoading(false);
    };

    // useEffect para obtener el hostname al cargar el componente
    //useEffect(() => {
    //    const fetchHostname = async () => {
    //        try {
    //            const response = await axios.get(`${API_URL}/reporte/maquina`);
    //            setHostname(response.data.hostname);
    //        } catch (error) {
    //            console.error("Error obteniendo el hostname:", error);
    //        }
    //    };
    //    fetchHostname();
    //}, []);

    return (
        <div className="container">
            {/* 📌 Encabezado */}
            <header>
                <img src={logo} alt="Logo" className="logo" />
                <div className="header-text">
                    <h1>Empresa Portuaria Quetzal</h1>
                    <h2>Reporte Contenedores Verdes Sin Retención</h2>
                    <h3>{hostname}</h3> 
                </div>
            </header>

            {/* 📌 Selector de fechas */}
            <DatePicker onSearch={fetchData} />

            {/* 📌 Mostrar la gráfica si NO se ha presionado el botón de búsqueda */}
            {!searchPerformed && <GraficaContenedores />}

            {/* 📌 Botones de exportación */}
            {data.length > 0 && <ExportButtons data={data} fechaInicio={dates.fechaInicio} fechaFin={dates.fechaFin} />}

            {/* 📌 Tabla de datos */}
            {loading ? <Loading /> : data.length > 0 && <DataTable data={data} />}
        </div>
    );
};

export default Home;
