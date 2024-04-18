const knex = require("knex")(require("../knexfile"));

const getWarehouseList = async (req, res) => {
  try {
    const data = await knex('warehouses')
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(`Error retrieving warehouses: ${err}`)
  }
};

const getWarehouseItem = async (req, res) => {
  try {
    const data = await knex('warehouses')
    .where({id: req.params.id}) //.where is always an array, even if empty
    .first(); //takes first element of array, so that we're not dsplaying an array [].
    if (!data) {
      return res.status(404).json({ message: `Warehouse ID ${req.params.id } not found` });
  }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: `Error retrieving warehouse ID ${req.params.id}`, error: `${err}` });
  }
}

const inventoriesByWarehouseId = async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    // Check if warehouse exists
    if (!warehouse) {
      return res.status(404).json({ message: `Warehouse ID ${req.params.id} not found` });
    }

    // Get the inventory list for the warehouse
    const inventories = await knex("inventories").where({
      warehouse_id: req.params.id,
    });

    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving inventory for warehouse ID ${req.params.id}`, error: `${err}` });
  }
}

module.exports = {
  getWarehouseList,
  getWarehouseItem,
  inventoriesByWarehouseId,
};