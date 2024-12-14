const express = require("express");
const pool = require("../../config/database.js");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    const { id, spid } = req.body;

    console.log(req.body);
    try {
        if (spid) {
            const result = await pool.query(
                "SELECT phone FROM serviceproviders WHERE spid = $1",
                [spid]
            );

            if (result.rowCount > 0) {
                const phoneNumber = result.rows[0].phone;
                res.status(200).send(phoneNumber);
            } else {
                res.status(404).send("Service Provider not found");
            }
        } else if (id) {
            const result = await pool.query(
                "SELECT phone FROM users WHERE id = $1",
                [id]
            );

            if (result.rowCount > 0) {
                const phoneNumber = result.rows[0].phone;
                res.send(phoneNumber);
            } else {
                res.status(404).send("User not found");
            }
        } else {
            res.status(404).send(
                "User id or Service provider id not passed !!"
            );
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = app;
