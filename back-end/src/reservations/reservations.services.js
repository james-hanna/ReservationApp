const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations").insert(reservation, "*");
}

function list() {
  return knex("reservations").select("*").orderBy("reservation_time");
}
module.exports = {
  create,
  list,
};
