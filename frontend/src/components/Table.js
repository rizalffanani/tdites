import React, { useState } from "react";
import { useTable, useFilters } from "react-table";

export default function Table({ columns, data }) {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow,
        setFilter, // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    }, useFilters);

    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("nama", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
        <>
            <div className="row">
                <div className="col"></div>
                <div className="col-3">
                    <input
                        className="form-control"
                        value={filterInput}
                        onChange={handleFilterChange}
                        placeholder={"Search nama loker"}
                    />
                </div>
            </div>
            <table className="table table-striped mt-2" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}