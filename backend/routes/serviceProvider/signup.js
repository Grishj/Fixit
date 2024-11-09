const express = require("express");
const { createProvider } = require("../../models/provider");

const router = express.Router();

router.post("/", async (req, res) => {
    const {
        name,
        email,
        password,
        phone,
        address,
        city,
        location_latitude,
        location_longitude,
        profile_picture,
    } = req.body;

    if (
        !name ||
        !email ||
        !password ||
        !phone ||
        !address ||
        !city ||
        !location_latitude ||
        !location_longitude
    ) {
        return res.status(400).send("All fields are required");
    }

    try {
        const newProvider = await createProvider(
            name,
            email,
            password,
            phone,
            address,
            city,
            location_latitude,
            location_longitude,
            profile_picture
        );
        res.status(201).send(newProvider);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
