const express = require("express");
const upload = require("../../helper/upload.js");
const { createService } = require("../../models/service.js");

const app = express();

app.post("/", upload.single("profile_picture"), async (req, resp) => {
    const { spid, name, description, type, mincharge } = req.body;
    const service_image = req.file;

    if (!spid) {
        return resp.send("Service Provider ID (spid) is required!");
    }
    if (!name) {
        return resp.send("Name is required!");
    }
    if (!type) {
        return resp.send("Each Service must have a type.");
    }
    if (!mincharge) {
        return resp.send("You must declare a minimum charge for your service.");
    }

    try {
        const result = await createService(
            spid,
            name,
            description,
            type,
            mincharge,
            service_image
        );
        resp.send(result);
    } catch (error) {
        resp.status(500).send("Some Internal Error Occurred!");
    }
});

module.exports = app;
