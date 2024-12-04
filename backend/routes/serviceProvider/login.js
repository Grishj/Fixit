const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getProviderByEmail,
  getProviderByPhone,
} = require("../../models/provider");

const router = express.Router();

// Provider Login Endpoint
router.post("/", async (req, res) => {
  const { identifier, password } = req.body; // Using "identifier" instead of "email" and "phone"

  // Validate input
  if (!password || !identifier) {
    return res
      .status(400)
      .json({ message: "Identifier and password are required." });
  }

  try {
    // Determine whether the identifier is an email or phone number
    let provider;
    if (identifier.includes("@")) {
      provider = (await getProviderByEmail(identifier))[0];
    } else {
      provider = (await getProviderByPhone(identifier))[0];
    }

    // Check if provider exists
    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, provider.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Generate JWT token
    const authUser = {
      id: provider.id,
      email: provider.email,
      phone: provider.phone,
    };
    const token = jwt.sign(authUser, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Respond with user data and token
    res.status(200).json({
      message: "Login successful.",
      provider: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
