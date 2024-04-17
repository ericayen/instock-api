require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");

const express = require("express");
const app = express();

const knex = require("knex");

const inventoriesRoute = require("./routes/inventories");
const warehousesRoute = require("./routes/warehouses");

//defining middlewares
app.use(cors());
app.use(express.json());

app.use("./inventories", inventoriesRoute);
app.use("/warehouses", warehousesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
