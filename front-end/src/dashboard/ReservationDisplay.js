import React from "react";
import ReservationItem from "./ReservationItem.js";

function ReservationDisplay({ filteredList, loadReservations }) {
  return (
    <div>
      <ul className="reservations_list">
        {filteredList.map((res) => (
            <ReservationItem key={res.reservation_id} reservation={res} loadReservations={loadReservations} />  
        ))}
      </ul>
    </div>
  );
}

export default ReservationDisplay;