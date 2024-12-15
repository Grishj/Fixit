const express = require("express");
const jwt = require("jsonwebtoken");
const {
    getProviderByEmail,
    getProviderByPhone,
    createProvider,
} = require("../../models/provider.js");
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
    let hashedPassword;
    if (password) {
        hashedPassword = await hashPassword(password);
    }
    console.log(req.body);

    const duplicateEmail = (await getProviderByEmail(email)).length;
    const duplicatePhone = (await getProviderByPhone(phone)).length;

    if (
        !(duplicateEmail || duplicatePhone) &&
        name &&
        hashedPassword &&
        (email || phone)
    ) {
        try {
            const result = await createProvider(
                name,
                email,
                phone,
                hashedPassword,
                address,
                city,
                location_latitude,
                location_longitude
            );
            resp.status(200).send(result);
        } catch (err) {
            console.log("internal error");
            resp.status(500).send("Some Internal Error Occurred!");
        }
    } else if (!name) {
        resp.send("Name is required !!");
    } else if (!hashedPassword) {
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
