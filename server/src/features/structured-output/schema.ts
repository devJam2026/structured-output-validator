import { z } from "zod";

export const ScamAnalysisSchema = z.object({
    classification: z.enum(["scam", "safe", "suspicious"]),
    confidence: z.number().min(0).max(1),
    risk_factors: z.array(z.string()),
    safe_action: z.string(),
});

export type ScamAnalysis = z.infer<typeof ScamAnalysisSchema>;