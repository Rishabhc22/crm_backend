const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth_routes = require("./routes/authRoutes");
const user_routes = require("./routes/userRoutes");
const ticket_routes = require("./routes/ticketRoutes");
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const middleware = require("./middlewares/authMiddleware");

// Connecting to the database

app.use(express.urlencoded({ extender: true }));

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/crm_backend")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middleware.isTokenValid);
auth_routes(app);
user_routes(app);
ticket_routes(app);

app.listen(serverConfig.PORT, () =>
  console.log(`Server started on port ${serverConfig.PORT}`)
);
