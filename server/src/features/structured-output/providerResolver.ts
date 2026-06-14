import { mockProvider } from "./mockProvider.js";
import { openAIProvider } from "./openaiProvider.js";
import type { LLMProvider, LLMProviderName } from "./provider.js";

export function getLLMProvider(): LLMProvider {
    const provider = (process.env.LLM_PROVIDER || "mock") as LLMProviderName;

    if (provider === "openai") {
        return openAIProvider;
    }

    return mockProvider;
}