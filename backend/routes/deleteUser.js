const express = require("express");
const client = require("../config/database.js");

const app = express();

app.delete("/:id", (req, resp) => {
    const { id } = req.params;

    if (!id) {
        return resp.status(400).send("User ID is required");
    }

    const query = `
        DELETE FROM users WHERE id = $1 RETURNING *;
    `;

    client.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            resp.status(500).send("Error deleting user from the database");
        } else if (result.rowCount === 0) {
            resp.status(404).send("User not found");
        } else {
            resp.status(200).json(result.rows[0]);
        }
    });
});

module.exports = app;
