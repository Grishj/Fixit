const express = require("express");
const { deleteUserById, getUserById } = require("../../models/user.js");
const app = express();

app.delete("/:id", async (req, resp) => {
    const { id } = req.params;

    if (!id) {
        return resp.status(400).send("User ID is required");
    }
    const user = (await getUserById(id)).length;

    if (user) {
        try {
            const result = await deleteUserById(id);
            resp.send(result);
        } catch (err) {
            resp.status(500).send("Some Internal Error Occurred!");
        }
    } else {
        resp.status(400).send("User not found");
    }
});

module.exports = app;
