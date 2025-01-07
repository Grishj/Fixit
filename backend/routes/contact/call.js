const express = require("express");
const { getPhoneBySpid, getPhoneById } = require("../../models/contact.js");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    const { id, spid } = req.body;

    console.log(req.body);
    try {
        if (spid) {
            const result = await getPhoneBySpid(spid);
            res.status(200).send(result);
        } else if (id) {
            const result = await getPhoneById(id);
            res.status(200).send(result);
        } else {
            res.status(404).send(
                "User id or Service provider id not passed !!"
            );
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = app;
