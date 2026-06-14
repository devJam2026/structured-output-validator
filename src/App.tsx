import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { InputMessageCard } from "./components/InputMessageCard";
import { RawOutputCard } from "./components/RawOutPutCard";
import { SchemaViewerCard } from "./components/SchemaViewerCard";
import { ValidationResultCard } from "./components/ValidationResultCard";
import { getMockLLMResponse } from "./lib/mockLLM";
import { validateLLMOutput } from "./lib/validator";
import type { ValidationResult } from "./types/validation";

export default function App() {
  const [input, setInput] = useState(
    "Your account is blocked. Send urgent payment to reactivate it."
  );

  const [rawOutput, setRawOutput] = useState("");
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  function handleAnalyze() {
    const response = getMockLLMResponse(input);
    const result = validateLLMOutput(response);

    setRawOutput(response);
    setValidation(result);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <AppHeader />

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <InputMessageCard
            input={input}
            onInputChange={setInput}
            onAnalyze={handleAnalyze}
          />

          <SchemaViewerCard />
        </section>

        {rawOutput && validation && (
          <section className="mt-8 grid gap-8 lg:grid-cols-2">
            <RawOutputCard rawOutput={rawOutput} />
            <ValidationResultCard validation={validation} />
          </section>
        )}
      </div>
    </main>
  );
}