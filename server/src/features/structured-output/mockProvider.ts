export async function callMockLLM(prompt: string): Promise<string> {
    const lowerPrompt = prompt.toLowerCase();

    if (
        lowerPrompt.includes("urgent") ||
        lowerPrompt.includes("payment") ||
        lowerPrompt.includes("blocked")
    ) {
        return JSON.stringify(
            {
                classification: "scam",
                confidence: 0.91,
                risk_factors: [
                    "Urgency",
                    "Suspicious payment request",
                    "Account threat language"
                ],
                safe_action: "Do not click the link or send money."
            },
            null,
            2
        );
    }

    return JSON.stringify(
        {
            classification: "safe",
            confidence: 0.82,
            risk_factors: [],
            safe_action: "No immediate risk detected."
        },
        null,
        2
    );
}