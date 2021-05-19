const service = require("./reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function validateReservation(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: "No Reservation data found",
    });
  }

  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;

  const validDate = /\d\d\d\d-\d\d-\d\d/;
  const validTime = /\d\d\:\d\d/;
  const validPeople = typeof people === "number";

  if (!first_name || first_name === "") {
    next({
      status: 400,
      message: "Reservation must have first_name",
    });
  } else if (!last_name || last_name === "") {
    next({
      status: 400,
      message: "Reservation must have last_name",
    });
  } else if (!mobile_number || mobile_number === "") {
    next({
      status: 400,
      message: "Reservation must have mobile_number",
    });
  } else if (
    !reservation_date ||
    reservation_date === "" ||
    !reservation_date.match(validDate)
  ) {
    next({
      status: 400,
      message: "Reservation must have reservation_date",
    });
  } else if (
    !reservation_time ||
    reservation_time === "" ||
    !reservation_time.match(validTime)
  ) {
    next({
      status: 400,
      message: "Reservation must have reservation_time",
    });
  } else if (!people || people === 0 || validPeople === false) {
    next({
      status: 400,
      message: "Reservation must have a people value",
    });
  }
  return next();
}

async function create(req, res, next) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function list(req, res, next) {
  let reservations;
  if (req.query.date) {
    reservations = await service.listByDate(req.query.date);
  } else {
    reservations = await service.list();
  }
  if (reservations.length > 1) {
    reservations.sort((a, b) =>
      a.reservation_time.localeCompare(b.reservation_time)
    );
  }
  res.json({ data: reservations });
}

module.exports = {
  create: [asyncErrorBoundary(validateReservation), asyncErrorBoundary(create)],
  list,
};
