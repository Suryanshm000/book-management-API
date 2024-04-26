const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const swaggerDocs = require("./swagger")

const app = express();

const port = 3000;

// connect to mongodb & listen for requests
mongoose.connect(process.env.CONNECTION_STRING)
  .then(result => app.listen(port, () => console.log(`database ${result.connection.name} is connected and app is running at http://localhost:3000`)))
  .catch(err => console.log(err));


// for creating swagger apis
swaggerDocs(app, port)

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use(errorHandler);
