# Structured Output Validator

**Project 5 of DevJam LLM Fundamentals**

Convert unpredictable LLM text into reliable, validated JSON contracts.

---

## Problem

LLMs are powerful, but their responses are not always safe for software systems.

A human can understand this:

> This message looks suspicious because it asks for urgent payment.

But applications need structured data:

```json
{
  "classification": "scam",
  "confidence": 0.91,
  "risk_factors": ["Urgency", "Suspicious payment request"],
  "safe_action": "Do not click the link or send money."
}