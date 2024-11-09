const express = require("express");
const upload = require("../../helper/upload.js");
const { updateService } = require("../../models/service.js");
const { updateProvider } = require("../../models/provider.js");

const app = express();

app.put("/:sid", upload.single("profile_picture"), async (req, resp) => {
    const { sid } = req.params;
    const { name, description, mincharge, type } = req.body;
    const service_image = req.file;

    if (!sid) {
        return resp.status(400).send("User ID is required");
    }
    const result = await updateProvider(
        sid,
        spid,
        name,
        description,
        type,
        mincharge,
        service_image
    );
    resp.status(200).send(result);
});

module.exports = app;
