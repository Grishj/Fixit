const pool = require("../config/database");

const createProvider = async (
    name,
    email,
    phone,
    password,
    address,
    city,
    location_latitude,
    location_longitude
) => {
    const query = `
        INSERT INTO serviceproviders (name, email, password, phone, address, city, location_latitude, location_longitude)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;`;
    const values = [
        name,
        email,
        password,
        phone,
        address,
        city,
        location_latitude,
        location_longitude,
    ];

    try {
        console.log("trying 2");
        const result = await pool.query(query, values);
        console.log(result.rows);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error inserting data into the database");
    }
};

const updateProvider = async (
    spid,
    name,
    email,
    phone,
    password,
    address,
    city,
    location_latitude,
    location_longitude,
    profile_picture
) => {
    if (!spid) {
        throw new Error("Provider ID is required");
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (email) {
        fields.push(`email = $${index++}`);
        values.push(email);
    }
    if (password) {
        fields.push(`password = $${index++}`);
        values.push(password);
    }
    if (phone) {
        fields.push(`phone = $${index++}`);
        values.push(phone);
    }
    if (address) {
        fields.push(`address = $${index++}`);
        values.push(address);
    }
    if (city) {
        fields.push(`city = $${index++}`);
        values.push(city);
    }
    if (location_latitude) {
        fields.push(`location_latitude = $${index++}`);
        values.push(location_latitude);
    }
    if (location_longitude) {
        fields.push(`location_longitude = $${index++}`);
        values.push(location_longitude);
    }
    if (profile_picture) {
        fields.push(`profile_picture = $${index++}`);
        values.push(profile_picture);
    }

    if (fields.length === 0) {
        throw new Error("No fields to update");
    }

    values.push(spid);
    const query = `
        UPDATE serviceproviders
        SET ${fields.join(", ")}
        WHERE spid = $${index}
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error("Provider not found");
        }
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error updating provider in the database");
    }
};

const getProviderBySpid = async (spid) => {
    const query = `SELECT * FROM serviceproviders WHERE spid = $1`;
    try {
        const result = await pool.query(query, [spid]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getProviderByEmail = async (email) => {
    const query = `SELECT * FROM serviceproviders WHERE email = $1`;
    try {
        const result = await pool.query(query, [email]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getProviderByPhone = async (phone) => {
    const query = `SELECT * FROM serviceproviders WHERE phone = $1`;
    try {
        const result = await pool.query(query, [phone]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getProviders = async () => {
    const query = `SELECT spid, name, email, phone, address, city FROM serviceproviders`;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const deleteProviderById = async (spid) => {
    if (!spid) {
        throw new Error("Provider ID is required");
    }

    const query = `DELETE FROM serviceproviders WHERE spid = $1 RETURNING *;`;

    try {
        const result = await pool.query(query, [spid]);
        if (result.rowCount === 0) {
            const error = new Error("Provider not found");
            error.code = "NOT_FOUND"; // Assign a custom error code
            throw error;
        }
        return result.rows[0]; // Return the deleted provider's details
    } catch (err) {
        console.error("Error deleting provider:", err.message);
        if (err.code === "NOT_FOUND") {
            throw err; // Rethrow specific error for the route to handle
        }
        throw new Error("Internal database error"); // Throw a general error for other cases
    }
};

module.exports = {
    createProvider,
    updateProvider,
    getProviders,
    getProviderBySpid,
    getProviderByEmail,
    getProviderByPhone,
    deleteProviderById,
};
