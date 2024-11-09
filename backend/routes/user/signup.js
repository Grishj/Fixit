const express = require("express");
const bcrypt = require("bcrypt");
const {
    createUser,
    getUserByEmail,
    getUserByPhone,
} = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
    const {
        name,
        location_latitude,
        location_longitude,
        email,
        phone,
        password,
        profile_picture,
    } = req.body;

    if (
        !name ||
        !location_latitude ||
        !location_longitude ||
        !email ||
        !phone ||
        !password
    ) {
        return res.status(400).send("All fields are required");
    }

    try {
        const existingEmailUser = await getUserByEmail(email);
        if (existingEmailUser.length > 0) {
            return res.status(409).send("Email is already registered");
        }

        const existingPhoneUser = await getUserByPhone(phone);
        if (existingPhoneUser.length > 0) {
            return res.status(409).send("Phone number is already registered");
        }

        const newUser = await createUser(
            name,
            location_latitude,
            location_longitude,
            email,
            phone,
            password,
            profile_picture
        );

        res.status(201).json({
            message: "User created successfully",
            user: newUser[0], // Assuming createUser returns an array of users
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
