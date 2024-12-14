const express = require("express");
const pool = require("../../config/database.js");
const auth = require("../../auth/auth.js");
const app = express();
app.use(express.json());

app.get("/", auth, async (req, resp) => {
    const { id } = req.body;

    const query = `SELECT * FROM bookings
    WHERE id = $1;`;
    const values = [id];

    try {
        const result = await pool.query(query, values);
        resp.status(200).json(result.rows[0]);
        console.log(result);
    } catch (err) {
        console.error(err);
        resp.status(500).send("Internal Server Error");
    }
});

module.exports = app;
