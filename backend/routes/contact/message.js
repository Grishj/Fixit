const express = require("express");
const pool = require("../../config/database.js"); // Assuming you have configured the database pool
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
        const query = `
            INSERT INTO Messages (id, spid, messagetext, senderType)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [id, spid, messagetext, senderType];

        // Execute the query
        await pool.query(query, values);

        // Send a success response
        resp.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
        console.error("Error saving data:", error);
        resp.status(500).json({ error: "Internal server error" });
    }
});

module.exports = app;
