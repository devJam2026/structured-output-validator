import { SectionCard } from "./SectionCard";

type RawOutputCardProps = {
    rawOutput: string;
};

export function RawOutputCard({ rawOutput }: RawOutputCardProps) {
    return (
        <SectionCard title="Raw LLM Output">
            <pre className="overflow-auto rounded-xl bg-slate-950 p-6 text-sm leading-7 text-slate-300">
                {rawOutput}
            </pre>
        </SectionCard>
    );
}