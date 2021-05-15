
const service = require("./reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function create(req, res, next) {
  service
    .create(req.body)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function list(req, res, next) {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  create: [asyncErrorBoundary(create)],
  list,
};
