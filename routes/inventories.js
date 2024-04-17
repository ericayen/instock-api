const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventories-controller");

router.route("/")
  .post(inventoriesController.addInventoryItem)

router.route("/:id")
  .put(inventoriesController.editInventoryItem)
  .delete (inventoriesController.deleteInventoryItem);
  
module.exports = router;