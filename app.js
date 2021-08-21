const express = require("express");
const app = express();
const checks = require("./routes/checks");
const suppliers = require("./routes/suppliers");
const users = require("./routes/users");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Authorization, Content-Type"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});
app.use("/checks", checks);
app.use("/suppliers", suppliers);
app.use("/users", users);

app.use((req, res, next) => {
  const erro = new Error("Route not found");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
