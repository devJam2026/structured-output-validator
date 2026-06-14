import type { ValidationResult } from "../types/validation";

export type AnalyzeApiResponse = {
    input: string;
    promptVersion: string;
    provider: string;
    model: string;
    rawOutput: string;
    validation: ValidationResult;
    metadata: {
        latencyMs: number;
        timestamp: string;
    };
};

export async function analyzeMessageApi(
    message: string
): Promise<AnalyzeApiResponse> {
    const response = await fetch("http://localhost:4000/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
        throw new Error(
            payload?.error?.message || "Failed to analyze the message."
        );
    }

    return payload.data;
}