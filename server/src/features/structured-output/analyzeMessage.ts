import { buildScamAnalysisPrompt } from "./buildPrompt.js";
import { getLLMProvider } from "./providerResolver.js";
import { validateLLMOutput } from "./validator.js";

export async function analyzeMessage(message: string) {
    const startedAt = Date.now();

    const prompt = buildScamAnalysisPrompt(message);
    const llmProvider = getLLMProvider();

    const llmResponse = await llmProvider.generateStructuredOutput(prompt);
    const validation = validateLLMOutput(llmResponse.rawOutput);

    return {
        input: message,
        promptVersion: "scam-analysis-v1",
        provider: llmResponse.provider,
        model: llmResponse.model,
        rawOutput: llmResponse.rawOutput,
        validation,
        metadata: {
            latencyMs: Date.now() - startedAt,
            timestamp: new Date().toISOString(),
        },
    };
}