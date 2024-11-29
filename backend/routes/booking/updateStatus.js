const express = require("express");
const client = require("../../config/database.js");
const auth = require("../../auth/auth.js");
const app = express();
app.use(express.json());

app.put("/", auth, async (req, resp) => {
    const { id, sid, status } = req.body;

    const updateQuery = `
    UPDATE bookings
    SET status = $3
    WHERE id = $1 AND sid = $2
    RETURNING *;`;
    const values = [id, sid, status];

    try {
        const existingUsers = await client.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        const userExist = existingUsers.rowCount > 0;

        const existingServices = await client.query(
            `SELECT * FROM services WHERE sid = $1`,
            [sid]
        );
        const serviceExist = existingServices.rowCount > 0;

        const existingBooking = await client.query(
            `SELECT * FROM bookings WHERE id = $1 AND sid = $2`,
            [id, sid]
        );
        const bookingExist = existingBooking.rowCount > 0;

        if (userExist && serviceExist && bookingExist) {
            const result = await client.query(updateQuery, values);
            resp.status(200).json(result.rows[0]);
        } else if (!serviceExist) {
            resp.status(400).send("Requested service does not exist!");
        } else if (!bookingExist) {
            resp.status(400).send("Booking does not exist!");
        } else if (!userExist) {
            resp.status(400).send("User not available!");
        } else {
            resp.status(400).send("Internal Server Error!");
        }
    } catch (err) {
        console.error(err);
        resp.status(500).send("Internal Server Error");
    }
});

module.exports = app;
