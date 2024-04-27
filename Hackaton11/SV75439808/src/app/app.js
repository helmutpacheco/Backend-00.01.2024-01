const express = require("express");
const mascotaR = require("../routers/mascota.routes.js");
const app = express();

app.get("/", (req, res) => {
  res.send("This is my first API");
});

app.use("/api/v1", mascotaR)

module.exports = app;
