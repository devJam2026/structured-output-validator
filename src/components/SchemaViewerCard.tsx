import { SectionCard } from "./SectionCard";

export function SchemaViewerCard() {
  return (
    <SectionCard title="Expected JSON Schema">
      <pre className="overflow-auto rounded-xl bg-slate-950 p-6 text-base font-semibold leading-8 text-cyan-300">
        {`{
  classification: "scam" | "safe" | "suspicious",
  confidence: number,
  risk_factors: string[],
  safe_action: string
}`}
      </pre>
    </SectionCard>
  );
}