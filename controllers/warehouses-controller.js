const knex = require("knex")(require("../knexfile"));

const getWarehouseList = async (req, res) => {
  try {
    const data = await knex('warehouses')
    res.status(200).json(data);
  } catch(err) {
    res.status(400).send(`Error retrieving Users: ${err}`)
  }
};


const inventoriesByWarehouseId = async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    // Check if warehouse exists
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    // Get the inventory list for the warehouse
    const inventories = await knex("inventories").where({
      warehouse_id: req.params.id,
    });

    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: "Failed to get inventories of this warehouse", error: error });
  }
}

module.exports = {
  getWarehouseList,
  inventoriesByWarehouseId,
};