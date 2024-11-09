const client = require("../config/database");
const bcrypt = require("bcrypt");

const createProvider = async (
    name,
    email,
    password,
    phone,
    address,
    city,
    location_latitude,
    location_longitude,
    profile_picture
) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO providers (name, email, password, phone, address, city, location_latitude, location_longitude, profile_picture)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;`;
    const values = [
        name,
        email,
        hashedPassword,
        phone,
        address,
        city,
        location_latitude,
        location_longitude,
        profile_picture,
    ];

    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error inserting data into the database");
    }
};

const updateProvider = async (
    id,
    name,
    email,
    password,
    phone,
    address,
    city,
    location_latitude,
    location_longitude,
    profile_picture
) => {
    if (!id) {
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
        const hashedPassword = await bcrypt.hash(password, 10);
        fields.push(`password = $${index++}`);
        values.push(hashedPassword);
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

    values.push(id);
    const query = `
        UPDATE providers
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *;
    `;

    try {
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            throw new Error("Provider not found");
        }
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error updating provider in the database");
    }
};

const getProviderByEmail = async (email) => {
    const query = `SELECT * FROM providers WHERE email = $1`;
    try {
        const result = await client.query(query, [email]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getProviderByPhone = async (phone) => {
    const query = `SELECT * FROM providers WHERE phone = $1`;
    try {
        const result = await client.query(query, [phone]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getProviders = async () => {
    const query = `SELECT * FROM providers`;
    try {
        const result = await client.query(query);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const deleteProviderById = async (id) => {
    if (!id) {
        throw new Error("Provider ID is required");
    }

    const query = `DELETE FROM providers WHERE id = $1 RETURNING *;`;
    try {
        const result = await client.query(query, [id]);
        if (result.rowCount === 0) {
            throw new Error("Provider not found");
        }
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error deleting provider from the database");
    }
};

module.exports = {
    createProvider,
    updateProvider,
    getProviders,
    getProviderByEmail,
    getProviderByPhone,
    deleteProviderById,
};
