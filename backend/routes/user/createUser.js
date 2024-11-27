const express = require("express");
const client = require("../../config/database.js");
const upload = require("../../helper/upload.js");
const hashPassword = require("../../helper/hashPassword.js");
const app = express();

app.post("/", upload.single("profile_picture"), async (req, resp) => {
    const {
        name,
        location_latitude,
        location_longitude,
        email,
        phone,
        password,
    } = req.body;
    const profile_picture = req.file;
    hashedPassword = await hashPassword(password);

    const query = `
    INSERT INTO users (name, location_latitude, location_longitude, email, phone, password, profile_picture)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`;
    const values = [
        name,
        location_latitude,
        location_longitude,
        email,
        phone,
        hashedPassword,
        profile_picture,
    ];

    const dupliPhone = await client.query(
        `SELECT * FROM users WHERE phone = ${phone}`
    );
    duplicatePhone = dupliPhone.rowCount;
    // Some errors here..
    const dupliEmail = await client.query(
        `SELECT * FROM users WHERE email='${email}'`
    );
    duplicateEmail = dupliEmail.rowCount;
    if (
        !(duplicateEmail || duplicatePhone) &&
        name &&
        password &&
        email &&
        phone
    ) {
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
    } else if (!name) {
        resp.send("Name is required !!");
    } else if (!password) {
        resp.send("Password is required !!");
    } else if (!email) {
        resp.send("Email is required !!");
    } else if (!phone) {
        resp.send("Phone is required !!");
    } else if (duplicateEmail && duplicatePhone) {
        resp.send("Email and Phone are already registered !!");
    } else if (duplicateEmail) {
        resp.send("Email address is already registered !!");
    } else if (duplicatePhone) {
        resp.send("Phone number is already registered !!");
    } else {
        resp.send("Some Internal Error Occurred !!");
    }
});

module.exports = app;
