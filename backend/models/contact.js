const pool = require("../config/database");

const getPhoneBySpid = async (spid) => {
    try {
        const result = await pool.query(
            "SELECT phone FROM serviceproviders WHERE spid = $1",
            [spid]
        );
        if (result.rowCount > 0) {
            const phoneNumber = result.rows[0].phone;
            return phoneNumber;
        } else {
            return "Service Provider not found";
        }
    } catch (err) {
        console.log(err);
        throw new Error("Internal server error !! ");
    }
};

const getPhoneById = async (id) => {
    try {
        const result = await pool.query(
            "SELECT phone FROM users WHERE id = $1",
            [id]
        );
        if (result.rowCount > 0) {
            const phoneNumber = result.rows[0].phone;
            return phoneNumber;
        } else {
            return "User not found";
        }
    } catch (err) {
        console.log(err);
        throw new Error("Internal server error !! ");
    }
};

const getChats = async (id, spid) => {
    try {
        const query = `
        SELECT * 
        FROM messages 
        WHERE id = $1 AND spid = $2
        ORDER BY sentat ASC
        `;

        const result = await pool.query(query, [id, spid]);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error("Internal server error !! ");
    }
};

const postChat = async (id, spid, messagetext, senderType) => {
    try {
        // Query to insert data into the database
        const query = `
            INSERT INTO Messages (id, spid, messagetext, senderType)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [id, spid, messagetext, senderType];
        await pool.query(query, values);
        return (message = "Data saved successfully!");
    } catch (err) {
        console.log(err);
        throw new Error("Internal server error !! ");
    }
};

module.exports = {
    getPhoneBySpid,
    getPhoneById,
    getChats,
    postChat,
};
