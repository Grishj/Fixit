const express = require("express");
const upload = require("../../helper/upload.js");
const { getServiceById, updateService } = require("../../models/service.js");

const app = express();

app.put("/", upload.single("profile_picture"), async (req, resp) => {
    const { sid, name, description, mincharge, type } = req.body;
    const service_image = req.file;

    if (!sid) {
        return resp.status(400).send("Service ID (sid) is required!");
    }

    try {
        // Fetch existing service data
        const existingService = await getServiceById(sid);
        if (!existingService) {
            return resp.status(404).send("Service not found!");
        }

        // Merge existing data with new data
        const updatedService = {
            spid: existingService.spid,
            name: name,
            description: description,
            mincharge: mincharge,
            type: type,
            service_image: service_image,
        };

        // Perform the update
        const result = await updateService(
            sid,
            updatedService.spid,
            updatedService.name,
            updatedService.description,
            updatedService.type,
            updatedService.mincharge,
            updatedService.service_image
        );

        resp.status(200).send(result);
    } catch (error) {
        console.error(error);
        resp.status(500).send("Some internal error occurred!");
    }
});

module.exports = app;
