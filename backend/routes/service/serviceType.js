const express = require("express");
const { getServiceTypes } = require("../../models/service.js");
const auth = require("../../auth/auth.js");
const app = express();

app.get("/", async (req, resp) => {
    try {
        const result = await getServiceTypes();
        resp.send(result);
    } catch (err) {
        resp.status(500).send("Some Internal Error Occurred!");
    }
});

module.exports = app;
