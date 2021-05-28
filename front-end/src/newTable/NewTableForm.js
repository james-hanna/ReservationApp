import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {  createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time"

export default function NewTableForm() {
  const history = useHistory();

  const initialtableData = {
    table_name: "",
    capacity: 0,
    status: false,
  };
  const [errors, setErrors] = useState([]);

  const [tableData, setTableData] = useState({
    ...initialtableData,
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    if (checkTableReqs() !== false) {
      await createTable(tableData)
      .then((res) => history.push(`/dashboard?date=${today()}`)
      )
  }
}

  const nameHandler = ({ target }) => {
    setTableData({
      ...tableData,
      [target.name]: target.value,
    });
  };
  const capacityHandler = ({ target }) => {
    setTableData({
      ...tableData,
      [target.name]: Number(target.value),
    });
  };

  const cancelHandler = async (event) => {
    event.preventDefault();
    setTableData({ ...initialtableData });
    history.goBack();
  };

  const checkTableReqs = async () => {
    const foundErrors = [];
    if (tableData.table_name.length < 2) {
      foundErrors.push({
        message: "Error: table_name must be at least two characters long",
      });
    }
    if (tableData.capacity < 1) {
      foundErrors.push({
        message: "Error: table must hold at least one person.",
      });
    }
    
    setErrors(foundErrors);
    return (errors.length === 0) 
  };

  const errorList = () => {
    return errors.map((err, index) => <ErrorAlert key={index} error={err} />);
  };

  return (
    <form>
      {errorList()}
      <input
        value={tableData.table_name}
        onChange={nameHandler}
        id="table_name"
        placeholder="Table Name"
        type="text"
        name="table_name"
        required
      />
      <input
        value={tableData.capacity}
        onChange={capacityHandler}
        id="capacity"
        placeholder="Capacity"
        type="number"
        name="capacity"
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
