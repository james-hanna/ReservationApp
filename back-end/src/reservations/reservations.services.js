const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
    .then((reservations) => reservations[0]);
}
function listByDate(reservation_date) {
  return knex("reservations").select("*").where({ reservation_date });
}
function listById(id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: id })
    .then((res) => res[0]);
}
function list() {
  return knex("reservations").select("*");
}

const updateResStatus = (reservation_id, status) => {
  return knex("reservations")
    .update({ status }, "*")
    .where({ reservation_id })
    .then((res) => res[0]);
};

module.exports = {
  create,
  listByDate,
  listById,
  list,
  updateResStatus,
};
