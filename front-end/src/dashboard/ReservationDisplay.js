import React from "react";
import ReservationItem from "./ReservationItem.js";

function ReservationDisplay({ filteredList }) {
  return (
    <div>
      <ul className="reservations_list">
        {filteredList.map((res) => (
            <ReservationItem key={res.reservation_id} reservation={res} />  
        ))}
      </ul>
    </div>
  );
}

export default ReservationDisplay;