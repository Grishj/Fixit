const express = require("express");
const client = require("../config/database.js");

const app = express();

app.post("/", async (req, resp) => {
    const {
        name,
        location_latitude,
        location_longitude,
        contact_email,
        contact_phone,
        password,
    } = req.body;

    const query = `
    INSERT INTO users (name, location_latitude, location_longitude, contact_email, contact_phone, password)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;
    const values = [
        name,
        location_latitude,
        location_longitude,
        contact_email,
        contact_phone,
        password,
    ];

    const dupliPhone = await client.query(
        `SELECT * FROM users WHERE contact_phone = ${contact_phone}`
    );
    duplicatePhone = dupliPhone.rowCount;
    // Some errors here..
    const dupliEmail = 0; //await client.query(
    //     `SELECT * FROM users WHERE contact_email = ${contact_email}`
    // );
    duplicateEmail = dupliEmail.rowCount || 0;
    if (
        !(duplicateEmail.rowCount || duplicatePhone) &&
        name &&
        password &&
        location_longitude &&
        location_latitude &&
        contact_email &&
        contact_phone
    ) {
        client.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
                resp.status(500).send("Error inserting data into the database");
            } else {
                resp.status(201).json(result.rows[0]);
            }
        });
    } else if (!name) {
        resp.send("Name is required !!");
    } else if (!password) {
        resp.send("Password is required !!");
    } else if (!(location_latitude && location_longitude)) {
        resp.send("Location is required !!");
    } else if (!contact_email) {
        resp.send("Email is required !!");
    } else if (!contact_phone) {
        resp.send("Phone is required !!");
    } else if (duplicateEmail && duplicatePhone) {
        resp.send("Email and Phone are already registered !!");
    } else if (duplicateEmail) {
        resp.send("Email address is already registered !!");
    } else if (duplicatePhone) {
        resp.send("Phone number is already registered !!");
    } else {
        resp.send("Some Internal Error Occured !!");
    }
});

module.exports = app;
