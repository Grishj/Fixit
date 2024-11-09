const express = require("express");

const app = express();

app.use(express.json());

app.all("*", (req, resp) => {
    resp.status(404).send({ error: 404, message: "Page not found." });
});

module.exports = app;
