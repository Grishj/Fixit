const express = require("express");
const client = require("../../config/database.js");
const jwt = require("jsonwebtoken");
const hashPassword = require("../../helper/hashPassword.js");

const app = express();

app.post("/", async (req, resp) => {
    const {
        name,
        email,
        phone,
        password,
        address,
        city,
        location_latitude,
        location_longitude,
    } = req.body;
    const passwordhash = await hashPassword(password);
    const query = `
    INSERT INTO serviceproviders (name, email, password, phone, address, city, location_latitude, location_longitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
`;
    const values = [
        name,
        email,
        passwordhash,
        phone,
        address,
        city,
        location_latitude,
        location_longitude,
    ];

    const dupliPhone = await client.query(
        `SELECT * FROM serviceproviders WHERE phone = ${phone}`
    );
    duplicatePhone = dupliPhone.rowCount;
    const dupliEmail = await client.query(
        `SELECT * FROM serviceproviders WHERE email='${email}'`
    );
    duplicateEmail = dupliEmail.rowCount;
    if (
        !(duplicateEmail || duplicatePhone) &&
        name &&
        passwordhash &&
        (email || phone)
    ) {
        client.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
                resp.status(500).send(
                    "Error inserting data into the database",
                    err
                );
            } else {
                const provider = result.rows[0];
                // Authentication successful
                const authUser = { user: provider.email || provider.phone };
                const token = jwt.sign(authUser, process.env.JWT_SECRET_KEY, {
                    expiresIn: "1d",
                });

                resp.status(200).json(provider);
                // resp.status(200).json({
                //     message: "Signup successful",
                //     provider,
                //     token,
                // });
            }
        });
    } else if (!name) {
        resp.send("Name is required !!");
    } else if (!passwordhash) {
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
