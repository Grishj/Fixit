const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail, getUserByPhone } = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, phone, password } = req.body;

    if (!password) {
        return res.status(400).send("Password is required");
    }

    let user;

    try {
        if (email) {
            user = await getUserByEmail(email);
        } else if (phone) {
            user = await getUserByPhone(phone);
        } else {
            return res.status(400).send("Either email or phone is required");
        }

        if (!user || user.length === 0) {
            return res.status(404).send("User not found");
        }

        user = user[0]; // Assuming getUserByEmail and getUserByPhone return an array

        const matchingPassword = await bcrypt.compare(password, user.password);

        if (!matchingPassword) {
            return res.status(401).send("Invalid password");
        }

        // Authentication successful
        authUser = { user: user.email || user.phone };
        const token = jwt.sign(authUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        res.status(200).json({
            message: "Login successful",
            user: user,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;

/*
app.post("/login", (req, res) => {
    // Authenticate User
    const user = { name: req.body.username };
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "10m",
    });
    res.json({ token: token });
});

*/
