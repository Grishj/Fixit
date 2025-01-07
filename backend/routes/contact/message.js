const express = require("express");
const { postChat } = require("../../models/contact");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.post("/", async (req, resp) => {
    const { id, spid, messagetext, senderType } = req.body;

    // Input validation
    if ((!id || !spid || !messagetext, !senderType)) {
        return resp
            .status(400)
            .json({ error: "id, spid, message and sender type are required" });
    }

    try {
        // Query to insert data into the database
        const message = await postChat(id, spid, messagetext, senderType);
        // Send a success response
        resp.status(201).json({ message });
    } catch (error) {
        console.error("Error saving data:", error);
        resp.status(500).json({ error: "Internal server error" });
    }
});

module.exports = app;
