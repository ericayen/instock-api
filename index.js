require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");

const express = require("express");
const app = express();

const knex = require("knex");
const knexConfig = require("./config/knexfile");

// Initialize Knex instance
const db = knex(knexConfig.development);

//defining middlewares
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
