const express = require("express");
const { getServiceById, deleteServiceById } = require("../../models/service");
const app = express();

app.delete("/:sid", async (req, resp) => {
    const { sid } = req.params;

    if (!sid) {
        return resp.status(400).send("Service ID is required");
    } else {
        try {
            const service = await getServiceById(sid);
            if (service.rowcount) {
                const result = await deleteServiceById(sid);
                resp.send(result);
            }
        } catch (err) {
            console.log(err);
            resp.status(500).send("Some Internal Error Occurred!");
        }
    }
});

module.exports = app;
