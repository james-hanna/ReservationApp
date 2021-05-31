import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDisplay from "./ReservationDisplay";

export default function SearchByPhone() {
  const [phoneNum, setPhoneNum] = useState({});
  const [errors, setErrors] = useState([]);
  const [resByPhone, setResByPhone] = useState([]);
  const [status, setStatus] = useState(true);

  const clickHandler = async(event) => {
    event.preventDefault();
    console.log(phoneNum.mobile_number)
    const data = await listReservations({ mobile_number: phoneNum.mobile_number })
    data.length < 1 ? setStatus(false) : setResByPhone(data);
  };

  const changeHandler = ({ target }) => {
    const value = target.value;
    setPhoneNum({
      ...phoneNum,
      [target.name]: value,
    });
  };

  const errorList = () => {
    return errors.map((err, index) => <ErrorAlert key={index} error={err} />);
  };

  return (
    <div>
      <form>
        <input
          name="mobile_number"
          value={phoneNum.mobile_number}
          placeholder="Enter a customer's phone number"
          type="text"
          id="mobile_number"
          onChange={changeHandler}
          required
        />
        <button type="submit" onClick={clickHandler}>
          Find
        </button>
      </form>
      {errorList()}
      {status ? <ReservationDisplay filteredList={resByPhone} /> : <p>No reservations found</p>}
    </div>
  );
}