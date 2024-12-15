const express = require("express");
const { getUserById } = require("../../models/user");

const app = express();

app.get("/:id", async (req, resp) => {
    const { id } = req.params;
    if (id) {
        try {
            const result = await getUserById(id);
            resp.status(200).send(result[0]);
        } catch (err) {
            resp.status(500).send("Some Internal Error Occurred!");
        }
    } else {
        resp.status(400).send("User Id is required !");
    }
});
module.exports = app;
