const db = require("../data/db-config");

function find() {
  return db("users");
}

function findByUsername(username) {
  return db("users").where("username", username);
}

function add(user) {
  return db("users").insert(user, ["user_id", "username", "password"]);
}

function updateUser(id, user) {
  return db("users")
    .where("user_id", id)
    .update(user, ["user_id", "username", "password"]);
}

function findById(id) {
  return db("users")
    .select("user_id", "username", "password")
    .where("user_id", id)
    .first();
}

module.exports = {
  add,
  find,
  findById,
  findByUsername,
  updateUser,
};
