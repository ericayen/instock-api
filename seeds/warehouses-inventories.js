const warehouseData = require("../seed-data/warehouses");
const inventoryData = require("../seed-data/inventories");

exports.seed = function (knex) {
  return knex("inventory")
    .del()
    .then(function () {
      return knex("warehouse").del();
    })
    .then(function () {
      return knex("warehouse").insert(warehouseData);
    })
    .then(() => {
      return knex("inventory").insert(inventoryData);
    });
};
