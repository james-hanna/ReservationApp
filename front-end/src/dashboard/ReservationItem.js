import React from "react";
import { Link } from "react-router-dom"
import { updateReservationStatus } from "../utils/api";


export default function ReservationItem({ reservation, loadReservations }) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    reservation_date,
    people
  } = reservation;

const reservation_id = reservation.reservation_id;
const status = reservation.status;

const cancelHandler = async(reservation_id) => {
  const confirm = window.confirm("Do you want to cancel this reservation? This cannot be undone.")
  if(confirm){
    try {
      console.log(reservation_id)
      await updateReservationStatus(reservation_id, "cancelled")
      await loadReservations();
    } catch (error) {
      console.log(error);
    }
  }
}

  return (
    <li className="reservation-list-item">
      <h4>Reservation {reservation_id}:</h4>
      <div>{`Name: ${first_name} ${last_name}`}</div>
      <div>{`Phone: ${mobile_number}`}</div>
      <div>{`Time: ${reservation_time}`}</div>
      <div>{`Date: ${reservation_date}`}</div>
      <div>{`Party Size: ${people}`}</div>
      <div data-reservation-id-status={reservation_id}>{`Status: ${status}`}</div>
      {status === "booked" ? <Link to={`/reservations/${reservation_id}/seat`}>Seat</Link> : null}
      <Link to={`/reservations/${reservation_id}/edit`}>Edit</Link>
      <button onClick={() => cancelHandler(reservation_id)} data-reservation-id-cancel={reservation_id}>Cancel</button>
    </li>
  );
}