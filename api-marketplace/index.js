const express = require("express");
const app = express();
const PORT = process.env.NODE_PORT || 3000;
const sequelize = require("./libs/sequelize");
const { allRoutes } = require("./routes/index.routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");
const setupModels = require("./db/models");
require("dotenv").config();
require('./utils/auth')
app.use(express.json());

setupModels(sequelize);
// Sincronizar con la base de datos
sequelize
  .sync()
  .then(() => console.log("Database connection established successfully"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Ruta de ejemplo
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

allRoutes(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
