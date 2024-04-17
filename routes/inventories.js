const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventories-controller");

router.route("/")
  .post(inventoriesController.addInventoryItem);

module.exports = router;