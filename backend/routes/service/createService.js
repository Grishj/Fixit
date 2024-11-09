const express = require("express");
const upload = require("../../helper/upload.js");
const { createService } = require("../../models/service.js");

const app = express();

app.post("/:spid", upload.single("profile_picture"), async (req, resp) => {
    const { name, description, mincharge, type } = req.body;
    const service_image = req.file;
    console.log(req.params);
    const spid = req.params.spid;

    if (name && type && mincharge) {
        const result = await createService(
            spid,
            name,
            description,
            type,
            mincharge,
            service_image
        );
        resp.send(result);
    } else if (!name) {
        resp.send("Name is required !!");
    } else if (!type) {
        resp.send("Each Service must have a type");
    } else if (!mincharge) {
        resp.send("You must declare minimum charge for your service.");
    } else {
        resp.send("Some Internal Error Occurred !!");
    }
});

module.exports = app;
