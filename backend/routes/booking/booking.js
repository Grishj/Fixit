const express = require("express");
const pool = require("../../config/database.js");
const auth = require("../../auth/auth.js");
const app = express();
app.use(express.json());

app.post("/", auth, async (req, resp) => {
    const { id, sid, status } = req.body;

    try {
        // Check if user exists
        const existingUsers = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        const userExist = existingUsers.rowCount > 0;

        // Check if service exists
        const existingServices = await pool.query(
            `SELECT * FROM services WHERE sid = $1`,
            [sid]
        );
        const serviceExist = existingServices.rowCount > 0;

        // Check if booking already exists
        const bookingExist =
            (
                await pool.query(
                    `SELECT * FROM bookings WHERE id = $1 AND sid = $2`,
                    [id, sid]
                )
            ).rowCount > 0;

        const spid = await pool.query(
            `SELECT spid FROM services WHERE sid = $1`,
            [sid]
        );

        console.log(spid.rows);

        if (!userExist) {
            return resp.status(404).send("User not available !!");
        }
        if (!serviceExist) {
            return resp.status(404).send("Requested service does not exist !!");
        }
        if (bookingExist) {
            return resp
                .status(409)
                .send("Same service is already booked by you !!");
        }

        // Insert new booking
        const query = `
            INSERT INTO bookings (id, sid, status)
            VALUES ($1, $2, $3)
            RETURNING *;`;
        const values = [id, sid, status];

        const result = await pool.query(query, values);
        resp.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        resp.status(500).send("Internal Server Error !!");
    }
});

module.exports = app;
