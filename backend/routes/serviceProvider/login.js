const express = require("express");
const bcrypt = require("bcrypt");
const {
    getProviderByEmail,
    getProviderByPhone,
} = require("../../models/provider");

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, phone, password } = req.body;

    if (!password || (!email && !phone)) {
        return res.status(400).send("Email or phone and password are required");
    }

    try {
        let provider;

        if (email) {
            provider = (await getProviderByEmail(email))[0];
        } else if (phone) {
            provider = (await getProviderByPhone(phone))[0];
        }

        if (!provider) {
            return res.status(404).send("Provider not found");
        }

        const passwordMatch = await bcrypt.compare(password, provider.password);

        if (!passwordMatch) {
            return res.status(401).send("Incorrect password");
        }

        res.status(200).send(provider);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
