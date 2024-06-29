const express = require("express");
const client = require("../config/database.js");

const app = express();

app.get("/:_id", (req, resp) => {
    client.query(
        `SELECT * FROM users WHERE id = ${req.params._id}`,
        (err, result) => {
            if (!err) {
                console.log(req.params._id);
                resp.status(200).send(result.rows);
            } else {
                console.log(err.message);
                resp.status(500).send("Internal Server error !!");
            }
            client.end;
        }
    );
});
module.exports = app;
