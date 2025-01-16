const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./database");
const cardRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/cards", cardRoutes);


sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected");
  app.listen(3001, () => console.log("Server running on port 3001"));
});
