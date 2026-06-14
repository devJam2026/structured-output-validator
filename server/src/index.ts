import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { analyzeRouter } from "./routes/analyze.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        service: "structured-output-validator-api",
    });
});

app.use("/api/analyze", analyzeRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});