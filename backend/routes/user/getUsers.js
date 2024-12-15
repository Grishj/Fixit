const express = require("express");
const { getUsers } = require("../../models/user.js");
const app = express();

app.get("/", async (req, resp) => {
    try {
        const result = await getUsers();
        resp.send(result);
    } catch (err) {
        resp.status(500).send("Some Internal Error Occurred!");
    }
});
module.exports = app;
