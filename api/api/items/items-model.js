const db = require("../../data/db-config");

const getItems = (item_id) => {
  return db("items").where("plant_id", item_id).first();
};

const getItemById = (item_id) => {
  return db("items").where("item_id", item_id).first();
};

const createItem = (item) => {
  return db("items").insert(item, [
    "item_id",
    "name",
    "description",
    "location",
    "category",
    "price",
  ]);
};

const updateItem = async (id, item) => {
  return db("items")
    .where("item_id", id)
    .update(item, [
      "item_id",
      "name",
      "description",
      "location",
      "category",
      "price",
    ]);
};

const deleteItem = async (item_id) => {
  return db("items").where("item_id", item_id).del();
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
