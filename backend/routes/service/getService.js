const express = require("express");
const {
    getServiceById,
    getServicesByProviderId,
} = require("../../models/service.js");

const app = express();

app.get("/:_id", async (req, resp) => {
    const result = await getServiceById(req.params._id);
    resp.send(result);
});
module.exports = app;
