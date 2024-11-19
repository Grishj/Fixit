-- User table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location_latitude NUMERIC,
    location_longitude NUMERIC,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone NUMERIC NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture BYTEA
);
-- Service providers table
CREATE TABLE ServiceProviders (
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
-- Service table
CREATE TABLE Services (
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
-- Message table
CREATE TABLE Messages (
    mid SERIAL PRIMARY KEY,
    id INT NOT NULL,
    spid INT NOT NULL,
    MessageText TEXT,
    senderType VARCHAR(20) NOT NULL,
    SentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES Users(id),
    FOREIGN KEY (spid) REFERENCES ServiceProviders(spid)
);
-- Booking table
CREATE TABLE bookings (
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