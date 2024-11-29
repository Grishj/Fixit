const express = require("express");
const client = require("../../config/database.js");
const auth = require("../../auth/auth.js");
const app = express();
app.use(express.json());

app.get("/", auth, async (req, resp) => {
    const { id, sid } = req.body;

    const query = `
        SELECT * FROM bookings
    WHERE id = $1 AND sid = $2;`;
    const values = [id, sid];

    try {
        const result = await client.query(query, values);
        resp.status(200).json(result.rows[0]);
        console.log(result);
    } catch (err) {
        console.error(err);
        resp.status(500).send("Internal Server Error");
    }
});

module.exports = app;
