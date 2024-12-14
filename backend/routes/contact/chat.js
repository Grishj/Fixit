const express = require("express");
const pool = require("../../config/database.js"); // Assuming you have configured your PostgreSQL pool
const app = express();

app.get("/", async (req, res) => {
    const { id, spid } = req.body;
    console.log(req.body);
    try {
        if (!id || !spid) {
            return res.status(400).json({ error: "Missing id or spid" });
        }

        // Query to fetch chats between a user and a service provider
        const query = `
            SELECT * 
            FROM messages 
            WHERE id = $1 AND spid = $2
            ORDER BY sentat ASC
        `;

        const result = await pool.query(query, [id, spid]);

        res.status(200).json({
            success: true,
            chats: result.rows,
        });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
});

module.exports = app;
