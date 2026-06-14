import { buildScamAnalysisPrompt } from "./buildPrompt.js";
import { callMockLLM } from "./mockProvider.js";
import { validateLLMOutput } from "./validator.js";

export async function analyzeMessage(message: string) {
    const startedAt = Date.now();

    const prompt = buildScamAnalysisPrompt(message);
    const rawOutput = await callMockLLM(prompt);
    const validation = validateLLMOutput(rawOutput);

    return {
        input: message,
        promptVersion: "scam-analysis-v1",
        provider: "mock",
        rawOutput,
        validation,
        metadata: {
            latencyMs: Date.now() - startedAt,
            timestamp: new Date().toISOString(),
        },
    };
}