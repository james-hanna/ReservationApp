import React from "react";

export default function ReservationItem({ reservation }) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    reservation_date,
  } = reservation;
  return (
    <li className="reservation-list-item">
      <h4>Reservation {reservation.reservation_id}:</h4>
      <div>{`Name: ${first_name} ${last_name}`}</div>
      <div>{`Phone: ${mobile_number}`}</div>
      <div>{`Time: ${reservation_time}`}</div>
      <div>{`Date: ${reservation_date}`}</div>
    </li>
  );
}