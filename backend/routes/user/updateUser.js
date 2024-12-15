const express = require("express");
const upload = require("../../helper/upload.js");
const hashPassword = require("../../helper/hashPassword.js");
const { updateUser } = require("../../models/user.js");
const auth = require("../../auth/auth.js");
const app = express();

app.put("/", upload.single("profile_picture"), auth, async (req, resp) => {
    const {
        id,
        name,
        location_latitude,
        location_longitude,
        email,
        phone,
        password,
    } = req.body;
    const { profile_picture } = req.file;
    const hashedPassword = password ? await hashPassword(password) : null;

    try {
        const result = await updateUser(
            id,
            name,
            location_latitude,
            location_longitude,
            email,
            phone,
            hashedPassword,
            profile_picture
        );
        resp.send(result);
    } catch (err) {
        resp.status(500).send("Some Internal Error Occurred!");
    }
});

module.exports = app;
