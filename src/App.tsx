import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { InputMessageCard } from "./components/InputMessageCard";
import { RawOutputCard } from "./components/RawOutPutCard";
import { SchemaViewerCard } from "./components/SchemaViewerCard";
import { ValidationResultCard } from "./components/ValidationResultCard";
import { analyzeMessageApi } from "./services/analyzeApi";
import type { ValidationResult } from "./types/validation";

export default function App() {
  const [input, setInput] = useState(
    "Your account is blocked. Send urgent payment to reactivate it."
  );

  const [rawOutput, setRawOutput] = useState("");
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [metadata, setMetadata] = useState<{
    provider: string;
    model: string;
    promptVersion: string;
    latencyMs: number;
    timestamp: string;
  } | null>(null);

  async function handleAnalyze() {
    try {
      setIsLoading(true);
      setError("");

      const result = await analyzeMessageApi(input);

      setRawOutput(result.rawOutput);
      setValidation(result.validation);
      setMetadata({
        provider: result.provider,
        model: result.model,
        promptVersion: result.promptVersion,
        latencyMs: result.metadata.latencyMs,
        timestamp: result.metadata.timestamp,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while analyzing."
      );
    } finally {
      setIsLoading(false);
    }
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
            isLoading={isLoading}
          />

          <SchemaViewerCard />
        </section>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">
            {error}
          </div>
        )}

        {rawOutput && validation && (
          <section className="mt-8 grid gap-8 lg:grid-cols-2">
            <RawOutputCard rawOutput={rawOutput} />
            <ValidationResultCard validation={validation} />
          </section>
        )}

        {metadata && (
          <section className="mt-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-400 md:grid-cols-5">
            <div>
              <p className="text-slate-500">Provider</p>
              <p className="font-semibold text-slate-200">{metadata.provider}</p>
            </div>

            <div>
              <p className="text-slate-500">Model</p>
              <p className="font-semibold text-slate-200">{metadata.model}</p>
            </div>

            <div>
              <p className="text-slate-500">Prompt Version</p>
              <p className="font-semibold text-slate-200">
                {metadata.promptVersion}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Latency</p>
              <p className="font-semibold text-slate-200">
                {metadata.latencyMs}ms
              </p>
            </div>

            <div>
              <p className="text-slate-500">Timestamp</p>
              <p className="font-semibold text-slate-200">
                {metadata.timestamp}
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}