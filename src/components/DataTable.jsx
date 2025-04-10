import { useMemo } from "react";
import { useTable } from "react-table";
import { format, parseISO, isValid } from "date-fns"; 

const DataTable = ({ data }) => {
    const columns = useMemo(
        () => [
            { Header: "No.", accessor: "rowNumber", Cell: ({ row }) => row.index + 1 }, 
            { Header: "Contenedor", accessor: "CONTENEDOR" },
            { Header: "Movimiento", accessor: "MOVIMIENTO" },
            { Header: "Empresa", accessor: "EMPRESA" },
            { Header: "Fecha Factura", accessor: "FECHA_FACTURA"
            },
            { Header: "No. Factura", accessor: "NO_FACTURA" },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="table-container">
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th key={column.id} {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr key={row.id} {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td key={cell.column.id} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
