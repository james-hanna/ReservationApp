import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservationForm() {
  const history = useHistory();

  const initialReservationData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [errors, setErrors] = useState([]);

  const [reservationData, setReservationData] = useState({
    ...initialReservationData,
  });

  const submitHandler = async (event) => {
    event.preventDefault();
      if (checkBusinessHours()) {
        await createReservation(reservationData)
        .then((res) => history.push(`/dashboard?date=${reservationData.reservation_date}`)
        );
      }
    }


  const changeHandler = ({ target }) => {
    setReservationData({
      ...reservationData,
      [target.name]: target.value,
    });
  };
  const peopleHandler = ({ target }) => {
    setReservationData({
      ...reservationData,
      [target.name]: Number(target.value),
    });
  };


  const cancelHandler = async (event) => {
    event.preventDefault();
    setReservationData({ ...initialReservationData });
    history.goBack();
  };

  const checkBusinessHours = async () => {
    const reservationDate = new Date(
      `${reservationData.reservation_date}T${reservationData.reservation_time}:00.000`
    );
    const todaysDate = new Date();
    const foundErrors = [];
    if (reservationDate < todaysDate) {
      foundErrors.push({ message: "Can't reserve a day from the past" });
    }
    if (reservationDate.getDay() === 2) {
      foundErrors.push({ message: "Restaurant is closed on tuesdays" });
    }
    if (
      reservationDate.getHours() < 10 ||
      (reservationDate.getHours() === 10 &&
        reservationDate.getMinutes() >= 30) ||
      reservationDate.getHours() >= 22
    ) {
      foundErrors.push({ message: "The Restaurant opens at 10:30am" });
    } else if (
      reservationDate.getHours() === 21 &&
      reservationDate.getMinutes() >= 30
    ) {
      foundErrors.push({
        message:
          "the restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal",
      });
    }
    setErrors(foundErrors);
    if (foundErrors.length > 0) {
      return false;
    }
    return true;
  };

  const errorList = () => {
    return errors.map((err, index) => <ErrorAlert key={index} error={err} />);
  };

  return (
    <form>
      {errorList()}
      <input
        value={reservationData.first_name}
        onChange={changeHandler}
        id="first_name"
        placeholder="First name"
        type="text"
        name="first_name"
        required
      />
      <input
        value={reservationData.last_name}
        onChange={changeHandler}
        id="last_name"
        placeholder="Last name"
        type="text"
        name="last_name"
        required
      />
      <input
        value={reservationData.mobile_number}
        onChange={changeHandler}
        id="mobile_number"
        placeholder="Phone Number"
        type="tel"
        name="mobile_number"
        required
      />
      <input
        value={reservationData.reservation_date}
        onChange={changeHandler}
        id="reservation_date"
        placeholder="reservation_date"
        type="date"
        name="reservation_date"
        required
      />
      <input
        value={reservationData.reservation_time}
        onChange={changeHandler}
        id="reservation_time"
        placeholder="reservation_time"
        type="time"
        name="reservation_time"
        required
      />
      <input
        value={reservationData.people}
        onChange={peopleHandler}
        id="people"
        placeholder="1"
        type="number"
        name="people"
        required
      />
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
      <button type="cancel" onClick={cancelHandler}>
        Cancel
      </button>
    </form>
  );
}
