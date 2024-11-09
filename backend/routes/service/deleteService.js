const express = require("express");
const client = require("../../config/database.js");

const app = express();

app.delete("/:sid", (req, resp) => {
    const { sid } = req.params;

    if (!sid) {
        return resp.status(400).send("Service ID is required");
    }

    const query = `
        DELETE FROM services WHERE sid = $1 RETURNING *;
    `;

    client.query(query, [sid], (err, result) => {
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
