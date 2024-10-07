const express = require("express");
const cors = require("cors");
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

const app = express();
app.use(express.json());

const whitelist = ['https://magic-ws6m.onrender.com', 'http://localhost:5173', 'http://3.218.40.246', 'http://localhost:4000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

require('./utils/auth')
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
