const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
}

function list() {
  return knex("reservations").select("*");
}
module.exports = {
  create,
  list,
};