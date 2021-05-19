const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations").insert(reservation, "*").then((reservations) => reservations[0]);
}
function listByDate(reservation_date){
  return knex("reservations").select("*").where({reservation_date})
}

function list() {
  return knex("reservations").select("*");
}
module.exports = {
  create,
  listByDate,
  list,
};
