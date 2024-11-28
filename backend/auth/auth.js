const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const jwt = require("jsonwebtoken");

// console.log(process.env.JWT_SECRET_KEY);

async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).send("Login required for this feature..");

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send("Login session expired..");
        req.user = user;
        next();
    });
}
module.exports = authenticateToken;
