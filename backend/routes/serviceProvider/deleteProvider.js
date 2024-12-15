const express = require("express");
const { deleteProviderById } = require("../../models/provider");

const app = express();

app.delete("/:spid", async (req, res) => {
    const { spid } = req.params;

    try {
        const deletedProvider = await deleteProviderById(spid);
        res.status(200).json({
            message: "Provider deleted successfully",
            provider: deletedProvider,
        });
    } catch (err) {
        if (err.message === "Provider not found") {
            res.status(404).json({ error: "Provider not found" });
        } else {
            console.error("Internal error:", err.message);
            res.status(500).json({ error: "An internal error occurred" });
        }
    }
});

module.exports = app;
