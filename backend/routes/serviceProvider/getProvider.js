const express = require("express");
const { getProviderBySpid } = require("../../models/provider"); // Fixed path
const app = express();

app.get("/:spid", async (req, resp) => {
    // Updated route parameter
    const { spid } = req.params; // Consistent variable naming
    try {
        const result = await getProviderBySpid(spid);
        if (!result || result.length === 0) {
            resp.status(404).send("Provider not found");
        } else {
            resp.status(200).send(result);
        }
    } catch (err) {
        console.error("Internal error:", err.message); // Log actual error
        resp.status(500).send("Some Internal Error Occurred!");
    }
});

module.exports = app;
