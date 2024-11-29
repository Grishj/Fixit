const express = require("express");
const client = require("../../config/database.js");
const auth = require("../../auth/auth.js");
const app = express();
app.use(express.json());

app.put("/", auth, async (req, resp) => {
    const { bid, status } = req.body;

    const updateQuery = `
    UPDATE bookings
    SET status = $2
    WHERE bid = $1
    RETURNING *;`;
    const values = [bid, status];

    try {
        const result = await client.query(updateQuery, values);
        resp.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        resp.status(500).send("Internal Server Error");
    }
});

module.exports = app;
