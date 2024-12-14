// Never Used

const pool = require("../config/database");
const hashPassword = require("../helper/hashPassword");

const createUser = async (
    name,
    location_latitude,
    location_longitude,
    email,
    phone,
    password
) => {
    const hashedPassword = await hashPassword(password);
    const query = `
        INSERT INTO users (name, location_latitude, location_longitude, email, phone, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
    const values = [
        name,
        location_latitude,
        location_longitude,
        email,
        phone,
        hashedPassword,
    ];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error inserting data into the database");
    }
};

const updateUser = async (
    id,
    name,
    location_latitude,
    location_longitude,
    email,
    phone,
    password,
    profile_picture
) => {
    if (!id) {
        throw new Error("User ID is required");
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
    if (email) {
        fields.push(`email = $${index++}`);
        values.push(email);
    }
    if (phone) {
        fields.push(`phone = $${index++}`);
        values.push(phone);
    }
    if (password) {
        const hashedPassword = await hashPassword(password);
        fields.push(`password = $${index++}`);
        values.push(hashedPassword);
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
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error("User not found");
        }
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error updating user in the database");
    }
};

const getUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    try {
        const result = await pool.query(query, [email]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getUserByPhone = async (phone) => {
    const query = `SELECT * FROM users WHERE phone = $1`;
    try {
        const result = await pool.query(query, [phone]);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const getUsers = async () => {
    const query = `SELECT * FROM users`;
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal Server error !!");
    }
};

const deleteUserById = async (id) => {
    if (!id) {
        throw new Error("User ID is required");
    }

    const query = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            throw new Error("User not found");
        }
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Error deleting user from the database");
    }
};

module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUserByEmail,
    getUserByPhone,
    deleteUserById,
};
