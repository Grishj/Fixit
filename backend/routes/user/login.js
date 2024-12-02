const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail, getUserByPhone } = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
    const { identifier, password } = req.body; // Use 'identifier' instead of 'email' and 'phone'

    if (!identifier) {
        return res.status(400).send("Either email or phone is required");
    }

    if (!password) {
        return res.status(400).send("Password is required");
    }

    let user;

    try {
        // Determine if the identifier is an email or phone number
        if (identifier.includes("@")) {
            user = await getUserByEmail(identifier); // Assuming email contains "@"
        } else {
            user = await getUserByPhone(identifier);
        }

        if (!user || user.length === 0) {
            return res.status(404).send("User not found");
        }

        user = user[0]; // Assuming getUserByEmail and getUserByPhone return an array

        // Compare password
        const matchingPassword = await bcrypt.compare(password, user.password);
        if (!matchingPassword) {
            return res.status(401).send("Invalid password");
        }

        // Authentication successful
        const authUser = { user: user.email || user.phone };
        const token = jwt.sign(authUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                name: user.name,
            },
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
