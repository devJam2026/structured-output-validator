import { SectionCard } from "./SectionCard";
import type { ValidationResult } from "../types/validation";

type ValidationResultCardProps = {
  validation: ValidationResult;
};

export function ValidationResultCard({ validation }: ValidationResultCardProps) {
  return (
    <SectionCard title="Validation Result">
      {validation.isValid ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <p className="font-bold text-emerald-400">
            Valid structured output
          </p>

          <pre className="mt-4 overflow-auto text-sm leading-7 text-slate-300">
            {JSON.stringify(validation.parsed, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
          <p className="font-bold text-red-400">
            Invalid structured output
          </p>

          <ul className="mt-4 space-y-3 text-sm text-red-200">
            {validation.errors.map((error, index) => (
              <li key={index}>
                <strong>{error.path}</strong>: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  );
}