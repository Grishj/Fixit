const express = require("express");

const os = require("os");
const app = express();

app.use(express.json());

app.get("/", async (req, resp) => {
    function getLocalIPAddress() {
        const interfaces = os.networkInterfaces();
        for (const devName in interfaces) {
            const iface = interfaces[devName];
            for (const i in iface) {
                const addr = iface[i];
                if (addr.family === "IPv4" && addr.internal === false) {
                    return addr.address;
                }
            }
        }
        return "127.0.0.1"; // Return a default IP address if not found
    }

    const ip = getLocalIPAddress();
    console.log("Local IP:", ip);
    resp.status(200).send({ ip });
});

module.exports = app;
