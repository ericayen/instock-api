const knex = require("knex")(require("../knexfile"));

const getWarehouseList = async (req, res) => {
  try {
    const data = await knex('warehouses')
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(`Error retrieving warehouses: ${err}`)
  }
};

const addWarehouse = async (req, res) => {
  const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;
  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (
    contact_email.indexOf("@") === -1
  ) {
    return res.status(400).json({ message: "Email must be valid" });
  }
  if (
    contact_phone.match(/\d/g)?.length !== 10 &&
    contact_phone.match(/\d/g)?.length !== 11
  ) {
    return res.status(400).json({ message: "Phone number must be valid" });
  }

  // const warehouseList = getWarehouseList();
  const warehouseData = req.body;
  const newWarehouse = {
    warehouse_name: warehouseData.warehouse_name, 
    address: warehouseData.address, 
    city: warehouseData.city, 
    country: warehouseData.country, 
    contact_name: warehouseData.contact_name, 
    contact_position: warehouseData.contact_position, 
    contact_phone: warehouseData.contact_phone, 
    contact_email: warehouseData.contact_email
  }
  try {
    const insertWarehouse = await knex("warehouses").insert(newWarehouse);
    res.status(201).json(insertWarehouse)
  } catch (err) {
    res.status(400).json({ message: `Error adding warehouse`, error: `${err}` });
  }
};

const editWarehouse = async (req, res) => {
  try {
    const updateWarehouse = await knex('warehouses')
    .where({ id: req.params.id })
    .update(req.body);
    if (!updateWarehouse) {
      return res.status(404).json({ message: `Warehouse ID ${req.params.id } not found` });
    }
    const updatedWarehouse = await knex("warehouses")
        .where({
          id: req.params.id,
        });
    res.status(200).json(updatedWarehouse[0]);
  } catch (err) {
    res.status(400).json({ message: `Error retrieving warehouse ID ${req.params.id}`, error: `${err}` });
  }
}

const deleteWarehouse = async (req, res) => {
  try {
    // Check if the inventory item exists
    const data = await knex('warehouses')
      .where({ id: req.params.id })
      .first();
    if (!data) {
      return res.status(404).json({ message: `Warehouse ID ${req.params.id } not found` });
    }

    await knex("warehouses").where({ id: req.params.id }).del();
    await knex("inventories").where({ warehouse_id: req.params.id }).del(); //deletes all inventory items from this warehouse
    res.status(204).json({ message: `Warehouse ID ${req.params.id } successfully deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete warehouse', error: error.message });
  }
}

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
  addWarehouse,
  editWarehouse,
  deleteWarehouse,
  getWarehouseItem,
  inventoriesByWarehouseId
}