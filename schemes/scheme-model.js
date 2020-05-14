const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where("id", id).first();
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then((ids) => {
      return findById(ids[0]);
    });
}

function findSteps(id) {
  return db("steps")
    .where("scheme_id", id)
    .join("schemes", "steps.scheme_id", "=", "schemes.id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .orderBy("steps.step_number");
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then((changes) => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes").where({ id }).del();
}

/*
db('scheme') => a promise that resolves to a user
findById  => a promise that resolves to a user
add  => a promise that resolves to a user
post
*/
