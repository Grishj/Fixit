const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const client = require("./config/database.js");

PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

const login = require("./routes/user/login.js");
const signup = require("./routes/user/signup.js");
const getUsers = require("./routes/user/getUsers.js");
const getUser = require("./routes/user/getUser.js");
const createUser = require("./routes/user/createUser.js");
const deleteUser = require("./routes/user/deleteUser.js");
const updateUser = require("./routes/user/updateUser.js");

const plogin = require("./routes/serviceProvider/login.js");
const psignup = require("./routes/serviceProvider/signup.js");
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

const booking = require("./routes/booking/booking.js");
const bookingStatus = require("./routes/booking/updateStatus.js");

const message = require("./routes/contact/message.js");
const reply = require("./routes/contact/reply.js");
const call = require("./routes/contact/call.js");

const notfound = require("./routes/404.js");

client.connect();

app.get("/", (req, resp) => {
    resp.send("Hello from backend !!");
});

// User API Routes
app.use("/login", login); //post
app.use("/signup", signup); //post
app.use("/users", getUsers); //get all users
app.use("/user", getUser); //get 1 user with their id.
app.use("/createUser", createUser);
app.use("/updateUser", updateUser);
app.use("/deleteUser", deleteUser);

// Service Provider API Routes
app.use("/plogin", plogin);
app.use("/psignup", psignup);
app.use("/createProvider", createProvider);
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

// Booking
app.use("/booking", booking);
app.use("/bookingStatus", bookingStatus);

// Contact
app.use("/message", message);
app.use("/reply", reply);
app.use("/call", call); //send id or spid to get phone number

app.use("*", notfound); // 404 page

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
