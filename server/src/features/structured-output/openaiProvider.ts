import OpenAI from "openai";
import type { LLMProvider } from "./provider.js";

function getOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error(
            "OPENAI_API_KEY is missing. Add it in server/.env or set LLM_PROVIDER=mock."
        );
    }

    return new OpenAI({
        apiKey,
    });
}

export const openAIProvider: LLMProvider = {
    async generateStructuredOutput(prompt: string) {
        const client = getOpenAIClient();
        const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

        const response = await client.responses.create({
            model,
            input: prompt,
            temperature: 0,
        });

        return {
            provider: "openai",
            model,
            rawOutput: response.output_text,
        };
    },
};