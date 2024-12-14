const express = require("express");
const bodyParser = require("body-parser");
const createAllTables = require("./config/makeTable.js");
require("dotenv").config();

const pool = require("./config/database.js");

PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

createAllTables(); // Making tables in database if they do not exists.

const ip = require("./helper/ip.js");

const login = require("./routes/user/login.js");
const getUsers = require("./routes/user/getUsers.js");
const getUser = require("./routes/user/getUser.js");
const createUser = require("./routes/user/createUser.js");
const deleteUser = require("./routes/user/deleteUser.js");
const updateUser = require("./routes/user/updateUser.js");

const plogin = require("./routes/serviceProvider/login.js");
const createProvider = require("./routes/serviceProvider/createProvider.js");
const getProvider = require("./routes/serviceProvider/getProvider.js");
const getProviders = require("./routes/serviceProvider/getProviders.js");
const updateProvider = require("./routes/serviceProvider/updateProvider.js");
const deleteProvider = require("./routes/serviceProvider/deleteProvider.js");

const createService = require("./routes/service/createService.js");
const getService = require("./routes/service/getService.js");
const getServices = require("./routes/service/getServices.js");
const updateService = require("./routes/service/updateService.js");
const deleteService = require("./routes/service/deleteService.js");
const serviceType = require("./routes/service/serviceType.js");

const booking = require("./routes/booking/booking.js");
const getBooking = require("./routes/booking/getBooking.js");
const updateStatus = require("./routes/booking/updateStatus.js");

const message = require("./routes/contact/message.js");
const call = require("./routes/contact/call.js");
const chat = require("./routes/contact/chat.js");

const notfound = require("./routes/404.js");

pool.connect();

app.get("/", (req, resp) => {
    resp.status(200).send("Hello from backend !!");
});

app.use("/ip", ip);

// User API Routes
app.use("/login", login); //post
app.use("/signup", createUser); //post
app.use("/users", getUsers); //get all users
app.use("/user", getUser); //get 1 user with their id.
app.use("/updateUser", updateUser);
app.use("/deleteUser", deleteUser);

// Service Provider API Routes
app.use("/plogin", plogin);
app.use("/psignup", createProvider);
app.use("/provider", getProvider);
app.use("/providers", getProviders);
app.use("/updateProvider", updateProvider);
app.use("/deleteProvider", deleteProvider);

// Service Service API Routes
app.use("/createService", createService);
app.use("/service", getService);
app.use("/services", getServices);
app.use("/updateService", updateService);
app.use("/deleteService", deleteService);
app.use("/serviceCategories", serviceType);

// Booking
app.use("/booking", booking);
app.use("/updateStatus", updateStatus);
app.use("/getBooking", getBooking);

// Contact
app.use("/call", call); //send id or spid to get phone number
app.use("/message", message);
app.use("/chat", chat);

app.use("*", notfound); // 404 page

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
