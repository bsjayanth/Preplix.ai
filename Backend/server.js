
require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

//START SERVER
async function startServer() {
    try {

        // Connect to MongoDB
        await connectToDB();

        // Start Express server
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    } catch (error) {

        console.error("Server startup failed:", error.message);
        process.exit(1);

    }
}

startServer();
