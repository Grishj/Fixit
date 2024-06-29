const express = require("express");
const bodyParser = require("body-parser");
const client = require("./config/database.js");

PORT = 3000;
const app = express();
app.use(express.json());

const getUsers = require("./routes/getUsers.js");
const getUser = require("./routes/getUser.js");
const createUser = require("./routes/createUser.js");
const deleteUser = require("./routes/deleteUser.js");
const updateUser = require("./routes/updateUser.js");

client.connect();

app.get("/", (req, resp) => {
    resp.send("Hello from backend !!");
});

app.use("/users", getUsers); //get all users
app.use("/user", getUser); //get 1 user with their id.
app.use("/createUser", createUser);
app.use("/deleteUser", deleteUser);
app.use("/updateUser", updateUser);

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
