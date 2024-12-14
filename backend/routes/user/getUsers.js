const express = require("express");
const pool = require("../../config/database.js");

const app = express();

app.get("/", (req, resp) => {
    pool.query(
        `SELECT id, name, email, phone, password FROM users`,
        (err, result) => {
            if (!err) {
                resp.status(200).send(result.rows);
            } else {
                console.log(err.message);
                resp.status(500).send("Internal Server error !!");
            }
            pool.end;
        }
    );
});
module.exports = app;
