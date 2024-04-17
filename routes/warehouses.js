const express = require("express");
const router = express.Router();
const warehousesController = require("../controllers/warehouses-controller");

router.route("/")
  .get(warehousesController.getWarehouseList)
//   .post(warehousesController.addWarehouse)

// router.route("/:id")
//   .get
//   .put(warehousesController.editWarehouse)
//   .delete (warehousesController.deleteWarehouse);

router.route("/:id/inventories")
  .get(warehousesController.inventoriesByWarehouseId);

module.exports = router;