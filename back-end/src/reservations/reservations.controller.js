const service = require("./reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasProperties = require("../errors/hasProperties")(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function validateReservation(req, res, next) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;

  const validDateFormat = /\d\d\d\d-\d\d-\d\d/;
  const validTimeFormat = /\d\d\:\d\d/;
  const validPeople = typeof people === "number";
  const isValidDate = reservation_date.match(validDateFormat);
  const isValidTime = reservation_time.match(validTimeFormat);
  const today = new Date();
  const reservationDate = new Date(
    `${reservation_date}T${reservation_time}:00.000`
  );

  if (
    reservationDate.getHours() < 10 ||
    (reservationDate.getHours() === 10 && reservationDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message: "Error: Restaurant is will open at 10:30AM.",
    });
  } else if (
    reservationDate.getHours() > 22 ||
    (reservationDate.getHours() === 22 && reservationDate.getMinutes() >= 30)
  ) {
    return next({
      status: 400,
      message: "Error: Restaurant is closed after 10:30PM.",
    });
  } else if (
    reservationDate.getHours() > 21 ||
    (reservationDate.getHours() === 21 && reservationDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message:
        "Error: Reservation must be made at least an hour before closing.",
    });
  }
  if (
    isValidDate &&
    reservationDate.getDay() !== 2 &&
    reservationDate >= today &&
    isValidTime &&
    validPeople
  ) {
    next();
  } else {
    next({
      status: 400,
      message:
        "Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}" +
        "Restaurant cannot be closed, reservation must be in the future",
    });
  }
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
  create: [hasProperties, asyncErrorBoundary(validateReservation), asyncErrorBoundary(create)],
  list,
};
