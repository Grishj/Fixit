const express = require("express");
const { getServices } = require("../../models/service");
const app = express();

app.get("/", async (req, resp) => {
    const type = req.body.type;
    try {
        const result = await getServices(type);
        resp.send(result);
    } catch (err) {
        resp.status(500).send("Internal servel error !! ");
    }
});

module.exports = app;
