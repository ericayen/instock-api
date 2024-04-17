const express = require("express");
const router = express.Router();
const warehousesController = require("../controllers/warehouses-controller");

router.route("/:id/inventories")
  .get(warehousesController.inventoriesByWarehouseId);

module.exports = router;