const pool = require("./database");

// Function to create the Users table
const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location_latitude NUMERIC,
            location_longitude NUMERIC,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone NUMERIC NOT NULL,
            password VARCHAR(255) NOT NULL,
            profile_picture BYTEA
        );
    `;
    const userTable = await pool.query(query);
};

// Function to create the ServiceProviders table
const createServiceProvidersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS ServiceProviders (
            spid SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone NUMERIC NOT NULL,
            address VARCHAR(255),
            city VARCHAR(100),
            location_longitude NUMERIC,
            location_latitude NUMERIC,
            createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            profile_picture BYTEA,
            CONSTRAINT email_phone_unique UNIQUE (email, phone)
        );
    `;
    await pool.query(query);
};

// Function to create the Services table
const createServicesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Services (
            sid SERIAL PRIMARY KEY,
            spid INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            mincharge DECIMAL(10, 2),
            type VARCHAR(100),
            service_image BYTEA,
            createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (spid) REFERENCES ServiceProviders(spid)
        );
    `;
    await pool.query(query);
};

// Function to create the Messages table
const createMessagesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Messages (
            mid SERIAL PRIMARY KEY,
            id INT NOT NULL,
            spid INT NOT NULL,
            MessageText TEXT,
            senderType VARCHAR(20) NOT NULL,
            SentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id) REFERENCES Users(id),
            FOREIGN KEY (spid) REFERENCES ServiceProviders(spid)
        );
    `;
    await pool.query(query);
};

// Function to create the Bookings table
const createBookingsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS bookings (
            bid SERIAL PRIMARY KEY,
            id INT NOT NULL,
            spid INT NOT NULL,
            sid INT NOT NULL,
            bookingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            Status VARCHAR(50) NOT NULL,
            FOREIGN KEY (id) REFERENCES Users(id),
            FOREIGN KEY (spid) REFERENCES ServiceProviders(spid),
            FOREIGN KEY (sid) REFERENCES Services(sid)
        );
    `;
    await pool.query(query);
};

// Main function to create all tables
const createAllTables = async () => {
    try {
        await createUsersTable();
        await createServiceProvidersTable();
        await createServicesTable();
        await createMessagesTable();
        await createBookingsTable();
        console.log("Database it good to go....");
    } catch (error) {
        console.error("Error creating tables:", error.message);
    } finally {
        // pool.end(); // Close the database connection
    }
};

module.exports = createAllTables;
