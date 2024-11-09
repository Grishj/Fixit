const express = require("express");
const client = require("../../config/database.js");

const app = express();

app.delete("/:spid", (req, resp) => {
    const { spid } = req.params;

    if (!spid) {
        return resp.status(400).send("Service Provider ID (spid) is required");
    }

    const query = `
        DELETE FROM serviceproviders WHERE spid = $1 RETURNING *;
    `;

    client.query(query, [spid], (err, result) => {
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
