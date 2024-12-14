const express = require("express");
const pool = require("../../config/database.js");
const auth = require("../../auth/auth.js");
const app = express();

app.get("/", (req, resp) => {
    const type = req.body.type;
    if (type) {
        pool.query(
            `SELECT * FROM services WHERE type = '${type}';`,
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
    } else {
        pool.query(`SELECT * FROM services`, (err, result) => {
            if (!err) {
                resp.status(200).send(result.rows);
            } else {
                console.log(err.message);
                resp.status(500).send("Internal Server error !!");
            }
            pool.end;
        });
    }
});

module.exports = app;
