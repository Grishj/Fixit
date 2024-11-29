const client = require("../config/database");

const createService = async (
    spid,
    name,
    description,
    type,
    mincharge,
    service_image
) => {
    const query = `
        INSERT INTO services (spid, name, description, type, mincharge, service_image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
    const values = [spid, name, description, type, mincharge, service_image];

    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error inserting data into the database");
    }
};

const updateService = async (
    sid,
    spid,
    name,
    description,
    type,
    mincharge,
    service_image
) => {
    if (!sid) {
        throw new Error("Service ID is required");
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (spid) {
        fields.push(`sid = $${index++}`);
        values.push(spid);
    }
    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (description) {
        fields.push(`description = $${index++}`);
        values.push(description);
    }
    if (type) {
        fields.push(`type = $${index++}`);
        values.push(type);
    }
    if (mincharge) {
        fields.push(`mincharge = $${index++}`);
        values.push(mincharge);
    }
    if (service_image) {
        fields.push(`service_image = $${index++}`);
        values.push(service_image);
    }

    if (fields.length === 0) {
        throw new Error("No fields to update");
    }

    values.push(sid);
    const query = `
        UPDATE services
        SET ${fields.join(", ")}
        WHERE sid = $${index}
        RETURNING *;
    `;

    try {
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            throw new Error("Service not found");
        }
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error updating service in the database");
    }
};

const getServiceById = async (sid) => {
    const query = `SELECT * FROM services WHERE sid = $1`;
    try {
        const result = await client.query(query, [sid]);
        return result.rows[0];
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getServicesByProviderId = async (spid) => {
    const query = `SELECT * FROM services WHERE spid = $1`;
    try {
        const result = await client.query(query, [spid]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getServices = async () => {
    const query = `SELECT * FROM services`;
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const deleteServiceById = async (sid) => {
    if (!sid) {
        throw new Error("Service ID (sid) is required");
    }

    const query = `DELETE FROM services WHERE sid = $1 RETURNING *;`;
    try {
        const result = await client.query(query, [sid]);
        if (result.rowCount === 0) {
            throw new Error("Service not found");
        }
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error deleting service from the database");
    }
};

module.exports = {
    createService,
    updateService,
    getServiceById,
    getServicesByProviderId,
    getServices,
    deleteServiceById,
};
