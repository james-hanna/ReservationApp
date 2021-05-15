import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert"

export default function NewReservationForm() {
  const history = useHistory();

  const initialReservationData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [errors, setErrors] = useState([]);

  const [reservationData, setReservationData] = useState({
    ...initialReservationData,
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    if(isRestaurantOpen()){
      await createReservation(reservationData)
      .then((res) => history.push(`/dashboard`))
      setReservationData({...initialReservationData})
    }
  };

  const changeHandler = ({ target }) => {
    setReservationData({
      ...reservationData,
      [target.name]: target.value,
    });
  };

  function cancelHandler() {
    if (window.confirm("Cancel reservation?")) {
      setReservationData({ ...initialReservationData });
      history.goBack();
    }
  }

  function isRestaurantOpen() {
    const reservationDate = new Date(reservationData.reservation_date);
    const today = new Date();
    const foundErrors = [];
    if (reservationDate < today) {
      foundErrors.push({ message: "Can't reserve a day from the past" });
    }
    if (reservationDate.getDay() == 2) {
      foundErrors.push({ message: "Restaurant is closed on tuesdays" });
    }
    setErrors(foundErrors);
    if (foundErrors.length > 0) {
      return false;
    }
    return true;
  }

  const errorList = () => {
    return errors.map((err, index) => <ErrorAlert key={index} error={err} />)
  }

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
        onChange={changeHandler}
        id="people"
        min="1"
        max="6"
        placeholder="People"
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
