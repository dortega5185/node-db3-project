const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep,
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

function addStep(step, scheme_id) {
  const anotherStep = {
    scheme_id: scheme_id,
    step_number: step.step_number,
    instructions: step.instructions,
  };
  return db("steps")
    .insert(anotherStep, "id")
    .then((scheme_id) => {
      return findSteps(anotherStep.scheme_id);
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
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then((scheme) => {
      return db("schemes").where({ id: scheme.id }).first().del();
    });
}

/*
db('scheme') => a promise that resolves to a user
findById  => a promise that resolves to a user
add  => a promise that resolves to a user
post
*/
