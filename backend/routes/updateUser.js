const express = require("express");
const client = require("../config/database.js");

const app = express();

app.put("/:id", (req, resp) => {
    const { id } = req.params;
    const {
        name,
        location_latitude,
        location_longitude,
        contact_email,
        contact_phone,
        password,
    } = req.body;

    if (!id) {
        return resp.status(400).send("User ID is required");
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (location_latitude) {
        fields.push(`location_latitude = $${index++}`);
        values.push(location_latitude);
    }
    if (location_longitude) {
        fields.push(`location_longitude = $${index++}`);
        values.push(location_longitude);
    }
    if (contact_email) {
        fields.push(`contact_email = $${index++}`);
        values.push(contact_email);
    }
    if (contact_phone) {
        fields.push(`contact_phone = $${index++}`);
        values.push(contact_phone);
    }
    if (password) {
        fields.push(`password = $${index++}`);
        values.push(password);
    }

    if (fields.length === 0) {
        return resp.status(400).send("No fields to update");
    }

    values.push(id);
    const query = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *;
    `;

    client.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            resp.status(500).send("Error updating user in the database");
        } else if (result.rowCount === 0) {
            resp.status(404).send("User not found");
        } else {
            resp.status(200).json(result.rows[0]);
        }
    });
});

module.exports = app;
