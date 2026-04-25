import express from "express";
import { config } from 'dotenv'
import { connectDB, disconnectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

config();

const app = express();

app.use(express.json());



app.get("/", (req, res) => {
    res.send(" API running...");
});




app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);




app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ success: false, message });
});



const PORT = 5000;

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });


        process.on("unhandledRejection", (err) => {
            console.error("Unhandled Rejection: ", err);
            server.close(async () => {
                await disconnectDB();
                process.exit(1);
            });
        });

        process.on("uncaughtException", async (err) => {
            console.error("Uncaught Exception: ", err);
            server.close(async () => {
                await disconnectDB();
                process.exit(1);
            });
        });

        process.on("SIGTERM", async () => {
            console.error("SIGTERM received, shutting down gracefully");
            server.close(async () => {
                await disconnectDB();
                process.exit(0);
            });
        });

    } catch (err) {
        console.error("Failed to start server: ", err);
        process.exit(1);
    }
};

startServer();

