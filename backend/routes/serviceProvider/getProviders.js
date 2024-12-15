const express = require("express");
const { getProviders } = require("../../models/provider");

const app = express();

app.get("/", async (req, resp) => {
    try {
        const result = await getProviders();
        resp.send(result);
    } catch (err) {
        console.log("internal error");
        resp.status(500).send("Some Internal Error Occurred !");
    }
});
module.exports = app;
