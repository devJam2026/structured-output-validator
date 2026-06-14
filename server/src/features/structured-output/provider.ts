export type LLMProviderName = "mock" | "openai";

export type LLMProviderResponse = {
    rawOutput: string;
    provider: LLMProviderName;
    model: string;
};

export type LLMProvider = {
    generateStructuredOutput: (prompt: string) => Promise<LLMProviderResponse>;
};