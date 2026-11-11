
require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

//START SERVER
async function startServer() {
    try {

        // Connect to MongoDB
        await connectToDB();

        // Start Express server
        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {

        console.error("Server startup failed:", error.message);
        process.exit(1);

    }
}

startServer();
