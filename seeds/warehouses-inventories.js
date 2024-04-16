const warehouseData = require("../seed-data/warehouses");
const inventoryData = require("../seed-data/inventories");

exports.seed = async function (knex) {
  await knex("inventory").del();
  await knex("warehouse").del();
  await knex("warehouse").insert(warehouseData);
  await knex("inventory").insert(inventoryData);
};
