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

function add(user) {
  return db("schemes")
    .insert(user, "id")
    .then((ids) => {
      return findById(ids[0]);
    });
}

/*
db('scheme') => a promise that resolves to a user
findById  => a promise that resolves to a user
add  => a promise that resolves to a user
post
*/
function findSteps(id) {
  return db("steps").where("scheme_id", id);
}

function update(id, changes) {
  return db("schemes").where({ id }).update(changes);
}

function remove(id) {
  return db("schemes").where({ id }).del();
}
