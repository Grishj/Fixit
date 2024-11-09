const express = require("express");
const client = require("../../config/database.js");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    const { id, spid } = req.body;

    console.log(id, " ", spid);
    console.log(req.body);
    try {
        if (spid) {
            const result = await client.query(
                "SELECT phone FROM serviceproviders WHERE spid = $1",
                [spid]
            );

            if (result.rowCount > 0) {
                const phoneNumber = result.rows[0].phone;
                res.send(phoneNumber);
            } else {
                res.status(404).send("Service Provider not found");
            }
        } else if (id) {
            const result = await client.query(
                "SELECT contact_phone FROM users WHERE id = $1",
                [id]
            );

            if (result.rowCount > 0) {
                const phoneNumber = result.rows[0].contact_phone;
                res.send(phoneNumber);
            } else {
                res.status(404).send("User not found");
            }
        } else {
            res.send("User id or Service provider id not passed !!");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = app;
