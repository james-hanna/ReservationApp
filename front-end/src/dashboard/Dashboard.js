import React from "react";
import ReservationDisplay from "./ReservationDisplay";
import TableDisplay from "./TableDisplay";
import { useHistory } from "react-router-dom";
import { previous, today, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Dashboard({
  date,
  reservations,
  reservationsError,
  tables,
  tablesError,
  loadTables,
  loadReservations
}) {
  const history = useHistory();
  const filteredReservations = reservations.filter(
    (res) => res.reservation_date === date
  );
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
        <button
          type="button"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => history.push(`/dashboard?date=${today()}`)}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          Next
        </button>
      </div>
      <div>
        <ReservationDisplay filteredList={filteredReservations} />
      </div>
      <div>
        <TableDisplay tables={tables} loadTables={loadTables} loadReservations={loadReservations}/>
      </div>
    </main>
  );
}
