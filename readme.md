# Structured Output Validator

**Project 5 of DevJam LLM Fundamentals**

Convert unpredictable LLM text into reliable, validated JSON contracts.

---

## Why This Project Exists

LLMs are powerful, but their responses are not always safe for software systems.

A human can understand:

> This message looks suspicious because it asks for urgent payment.

But applications need structured data:

```json
{
  "classification": "scam",
  "confidence": 0.91,
  "risk_factors": [
    "Urgent payment request",
    "Account blocked claim without verification",
    "Pressure to act quickly"
  ],
  "safe_action": "Do not send any payment or personal information."
}