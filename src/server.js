import express from "express";
import {config} from 'dotenv'
import {connectDB, disconnectDB} from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

config();
connectDB();

const app = express();

app.use(express.json());



app.get("/", (req, res) => {
  res.send(" API running...");
});




app.use("/auth", authRoutes);
app.use("/books",bookRoutes);






const PORT = 5000;


const server = app.listen(PORT, ()=>{
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

process.on("SIGTERM",async  () => {
    console.error("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});



