const express = require("express");
const upload = require("../../helper/upload.js");
const hashPassword = require("../../helper/hashPassword.js");
const {
    updateProvider,
    getProviderBySpid,
    getProviderByEmail,
    getProviderByPhone,
} = require("../../models/provider.js");

const app = express();

app.put("/:spid", upload.single("profile_picture"), async (req, resp) => {
    const { spid } = req.params;
    const {
        name,
        email,
        phone,
        password,
        address,
        city,
        location_latitude,
        location_longitude,
    } = req.body;

    // Handle file upload
    const profile_picture = req.file;

    // Hash password only if provided
    const hashedPassword = password ? await hashPassword(password) : null;

    if (!spid) {
        return resp.status(400).send("Service provider's ID is required");
    }
    const duplicateEmail = (await getProviderByEmail(email)).length;
    const duplicatePhone = (await getProviderByPhone(phone)).length;

    if (!(duplicateEmail || duplicatePhone)) {
        try {
            const provider = await getProviderBySpid(spid);

            if (provider.length === 0) {
                return resp.status(404).send("Provider not found");
            }

            // Update provider details
            const result = await updateProvider(
                spid,
                name,
                email,
                phone,
                hashedPassword,
                address,
                city,
                location_latitude,
                location_longitude,
                profile_picture
            );
            return resp.status(200).send(result);
        } catch (err) {
            console.error("Internal error:", err.message);
            resp.status(500).send("Some Internal Error Occurred !");
        }
    } else if (duplicateEmail && duplicatePhone) {
        resp.send("Email and phone are already registered !! ");
    } else if (duplicateEmail) {
        resp.send("Email is already registered !! ");
    } else {
        resp.send("Phone number is already registered !! ");
    }
});

module.exports = app;
