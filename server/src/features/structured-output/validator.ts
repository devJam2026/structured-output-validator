import { ScamAnalysisSchema } from "./schema.js";

export function validateLLMOutput(rawOutput: string) {
    try {
        const parsed = JSON.parse(rawOutput);
        const result = ScamAnalysisSchema.safeParse(parsed);

        if (!result.success) {
            return {
                isValid: false,
                parsed: null,
                errors: result.error.issues.map((issue) => ({
                    path: issue.path.join(".") || "root",
                    message: issue.message,
                })),
            };
        }

        return {
            isValid: true,
            parsed: result.data,
            errors: [],
        };
    } catch {
        return {
            isValid: false,
            parsed: null,
            errors: [
                {
                    path: "root",
                    message: "Invalid JSON format. The LLM response could not be parsed.",
                },
            ],
        };
    }
}