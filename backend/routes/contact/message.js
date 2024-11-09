const express = require("express");
const client = require("../../config/database.js");
const app = express();

app.get("/", async (req, resp) => {
    resp.send("Chalyo chalyo !!");
});

module.exports = app;
