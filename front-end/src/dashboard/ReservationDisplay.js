import React from "react";
import ReservationItem from "./ReservationItem.js"

function ReservationDisplay({reservations}) {
    return(
        <div>
            <ul class="reservations_list">
                {reservations.map((res) => (
                    <ReservationItem key={res.reservation_id} reservation={res} />
                ))}
            </ul>
        </div>
    )
}

export default ReservationDisplay;
