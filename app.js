const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const itemRoutes = require("./itemRoutes");
const items = require("./fakeDb");

app.use(express.json());
app.use("/items", itemRoutes);

app.use(function (request, response, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

app.use(function (error, request, response, next) {
  let status = error.status || 500;
  let message = error.message;
  return response.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
