import { Router } from "express";
import { analyzeMessage } from "../features/structured-output/analyzeMessage.js";

export const analyzeRouter = Router();

analyzeRouter.post("/", async (req, res) => {
    try {
        const message = req.body?.message;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_REQUEST",
                    message: "message is required and must be a string.",
                },
            });
        }

        const result = await analyzeMessage(message);

        return res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong while analyzing the message.",
            },
        });
    }
});