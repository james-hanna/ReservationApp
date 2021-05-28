import React from "react";
import { Link } from "react-router-dom"


export default function ReservationItem({ reservation }) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    reservation_date,
  } = reservation;

const reservation_id = reservation.reservation_id;
const status = reservation.status;

  return (
    <li className="reservation-list-item">
      <h4>Reservation {reservation_id}:</h4>
      <div>{`Name: ${first_name} ${last_name}`}</div>
      <div>{`Phone: ${mobile_number}`}</div>
      <div>{`Time: ${reservation_time}`}</div>
      <div>{`Date: ${reservation_date}`}</div>
      <div data-reservation-id-status={reservation_id}>{`Status: ${status}`}</div>
      {status === "booked" ? <Link to={`/reservations/${reservation_id}/seat`}>Seat</Link> : null}
    </li>
  );
}