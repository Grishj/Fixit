const express = require("express");
const { getChats } = require("../../models/contact");

const app = express();

app.get("/", async (req, res) => {
    const { id, spid } = req.body;
    console.log(req.body);
    if (!id || !spid) {
        return res.status(400).json({ error: "Missing id and/or spid" });
    }

    try {
        const result = await getChats(id, spid);

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
