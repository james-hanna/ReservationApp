import React from "react";
import { deleteReservationFromTable } from "../utils/api";

function TableDisplay({ tables, loadTables, loadReservations }) {
  const finishHandler = async (table_id) => {
    const finished = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (finished) {
      try {
        await deleteReservationFromTable(table_id);
        await loadTables();
        await loadReservations();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <ul className="tables_list">
        {tables.map((table, index) => (
          <li key={index} className="table-list-item">
            <h4>Table {table.table_id}:</h4>
            <div>Name: {table.table_name}</div>
            <div>Capacity: {table.capacity}</div>
            <div data-table-id-status={table.table_id}>{`Status: ${
              table.reservation_id ? "occupied" : "free"
            }`}</div>
            {table.reservation_id ? (
              <button
                onClick={() => finishHandler(table.table_id)}
                data-table-id-finish={table.table_id}
              >
                Finish
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableDisplay;
