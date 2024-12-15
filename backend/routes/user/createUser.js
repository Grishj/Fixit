const express = require("express");
const upload = require("../../helper/upload.js");
const hashPassword = require("../../helper/hashPassword.js");
const app = express();
const {
    createUser,
    getUserByEmail,
    getUserByPhone,
} = require("../../models/user.js");

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

    const duplicateEmail = (await getUserByEmail(email)).length;
    const duplicatePhone = (await getUserByPhone(phone)).length;

    if (
        !(duplicateEmail || duplicatePhone) &&
        name &&
        password &&
        email &&
        phone
    ) {
        try {
            const result = await createUser(
                name,
                location_latitude,
                location_longitude,
                email,
                phone,
                password
            );
            resp.send(result);
        } catch (error) {
            resp.status(500).send("Some Internal Error Occurred!");
        }
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
