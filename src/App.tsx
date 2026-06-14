import { useState } from "react";
import { getMockLLMResponse } from "./lib/mockLLM";
import { validateLLMOutput } from "./lib/validator";

export default function App() {
  const [input, setInput] = useState(
    "Your account is blocked. Send urgent payment to reactivate it."
  );
  const [rawOutput, setRawOutput] = useState("");
  const [validation, setValidation] = useState<ReturnType<typeof validateLLMOutput> | null>(null);

  function handleAnalyze() {
    const response = getMockLLMResponse(input);
    const result = validateLLMOutput(response);

    setRawOutput(response);
    setValidation(result);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="mb-3 text-sm font-semibold text-cyan-400">
          DevJam LLM Fundamentals · Project 5
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Structured Output Validator
        </h1>

        <p className="mt-4 max-w-3xl text-slate-400">
          Learn how to convert unpredictable LLM text into reliable JSON that your
          application can validate, parse, store, and safely use.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-xl font-semibold">Input Message</h2>

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="mt-4 h-44 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm outline-none focus:border-cyan-400"
            />

            <button
              onClick={handleAnalyze}
              className="mt-4 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Analyze & Validate
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-xl font-semibold">Expected JSON Schema</h2>

            <pre className="mt-4 overflow-auto rounded-xl bg-slate-950 p-4 text-sm text-cyan-300">
              {`{
  classification: "scam" | "safe" | "suspicious",
  confidence: number,
  risk_factors: string[],
  safe_action: string
}`}
            </pre>
          </div>
        </div>

        {rawOutput && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="text-xl font-semibold">Raw LLM Output</h2>

              <pre className="mt-4 overflow-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-300">
                {rawOutput}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="text-xl font-semibold">Validation Result</h2>

              {validation?.isValid ? (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="font-semibold text-emerald-400">
                    Valid structured output
                  </p>
                  <pre className="mt-4 overflow-auto text-sm text-slate-300">
                    {JSON.stringify(validation.parsed, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <p className="font-semibold text-red-400">
                    Invalid structured output
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-red-200">
                    {validation?.errors.map((error, index) => (
                      <li key={index}>
                        <strong>{error.path}</strong>: {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}