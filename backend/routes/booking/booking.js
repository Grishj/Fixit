const express = require("express");
const client = require("../../config/database.js");
const app = express();
app.use(express.json());

app.post("/", async (req, resp) => {
    const { id, sid, status } = req.body;
    // console.log(req.body);
    const query = `
    INSERT INTO bookings (id, sid, status)
    VALUES ($1, $2, $3)
    RETURNING *;`;
    const values = [id, sid, status];

    const existingUsers = await client.query(
        `SELECT * FROM users WHERE id = ${id}`
    );
    const userExist = existingUsers.rowCount > 0;
    const existingServices = await client.query(
        `SELECT * FROM services WHERE sid = ${sid}`
    );
    const serviceExist = existingServices.rowCount > 0;

    const bookingExist =
        (
            await client.query(
                `SELECT * FROM bookings WHERE id = ${id} AND sid = ${sid}`
            )
        ).rowCount > 0;
    try {
        if (userExist && serviceExist && !bookingExist) {
            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    resp.status(500).send(
                        "Error inserting data into the database",
                        err
                    );
                } else {
                    resp.status(201).json(result.rows[0]);
                }
            });
        } else if (!serviceExist) {
            resp.send("Requested service does not exist !!");
        } else if (bookingExist) {
            resp.send("Same service is already booked by you !!");
        } else if (!userExist) {
            resp.send("User not available !!");
        } else {
            resp.status(400).send("Internal Server Error !!");
        }
    } catch {
        resp.status(400).send("Internal Server Error !!");
    }
});

module.exports = app;
