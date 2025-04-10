import { useState } from "react";

const DatePicker = ({ onSearch }) => {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [checks, setChecks] = useState({
        EPQ: false,
        GOGE: false,
        TODOS: false
    });

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setChecks((prev) => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fechaInicio || !fechaFin) {
            alert("Seleccione ambas fechas");
            return;
        }

        const formattedFechaInicio = formatDate(fechaInicio);
        const formattedFechaFin = formatDate(fechaFin);

        const payload = {
            fechaInicio: formattedFechaInicio,
            fechaFin: formattedFechaFin,
            filtros: checks
        };

        console.log("Payload enviado:", payload);
        onSearch(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="date-picker">
            <div className="input-group">
                <label htmlFor="fecha-inicio">Fecha Inicio:</label>
                <input
                    id="fecha-inicio"
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label htmlFor="fecha-fin">Fecha Final:</label>
                <input
                    id="fecha-fin"
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </div>

            <div className="checkbox-group">
                <label><input type="checkbox" name="EPQ" checked={checks.EPQ} onChange={handleCheckboxChange} /> EPQ</label>
                <label><input type="checkbox" name="GOGE" checked={checks.GOGE} onChange={handleCheckboxChange} /> GOGE</label>
                <label><input type="checkbox" name="TODOS" checked={checks.TODOS} onChange={handleCheckboxChange} /> TODOS</label>
            </div>

            <button type="submit">Buscar</button>
        </form>
    );
};

export default DatePicker;
