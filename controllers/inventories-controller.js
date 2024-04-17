const knex = require("knex")(require("../knexfile"));

const addInventoryItem = async (req, res) => {
  const { warehouse_id, item_name, description, category, status, quantity } = req.body;

  // Validate request body
  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    quantity === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (quantity < 0 || isNaN(quantity) || !Number.isInteger(quantity)) {
    return res.status(400).json({ message: "Quantity must be non-negative integer" });
  }

  if (
    (status === "In Stock" && quantity === 0) ||
    (status === "Out of Stock" && quantity !== 0)
  ) {
    return res.status(400).json({ message: "Stock status must match quantity" });
  }

  // Check if the warehouse exists
  const warehouseExists = await knex("warehouses")
    .where({ id: warehouse_id })
    .first();
  if (!warehouseExists) {
    return res.status(400).json({ message: "Warehouse not found" });
  }

  // Check if same inventory exists 
  const duplicates = await knex("inventories")
    .where({
      item_name: item_name,
      warehouse_id: warehouse_id,
    })
    .first();
  if (duplicates) {
    return res
      .status(400)
      .json({ message: "Inventory item already exists in this warehouse" });
  }

  try {
    // Insert new inventory into the database
    const newInventory = await knex("inventories").insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    });


    const [id] = newInventory;
    const insertedInventory = await knex("inventories")
      .where({ id })
      .first();
    
    res.status(201).json(insertedInventory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add new inventory item", error: error });
  }
};

const deleteInventoryItem = async (req, res) => {
  try {
    // Check if the inventory item exists
    const inventory = await knex('inventories')
      .where({ id: req.params.id })
      .first();
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    await knex("inventories").where({ id: req.params.id }).del();

    res.status(204).end();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete inventory item', error: error.message });
  }
}

module.exports = {
  addInventoryItem,
  deleteInventoryItem,
};
