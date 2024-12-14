import axios from "axios";

const backend = {
    backendUrl: "http://192.168.10.69:3000", // Placeholder for the backend URL
};

// Function to dynamically set the backend URL
export const initializeBackend = async () => {
    try {
        const response = await axios.get("http://localhost:3000/ip"); // Fetch the IP from the backend
        const ip = response.data.ip;
        backend.backendUrl = `http://${ip}:3000`; // Construct the backend URL dynamically
    } catch (error) {
        console.error("Error fetching backend IP:", error);
        throw new Error("Unable to initialize backend URL");
    }
};

export default backend;
