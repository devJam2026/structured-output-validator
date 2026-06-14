import { SectionCard } from "./SectionCard";

type InputMessageCardProps = {
    input: string;
    onInputChange: (value: string) => void;
    onAnalyze: () => void;
    isLoading: boolean;
};

export function InputMessageCard({
    input,
    onInputChange,
    onAnalyze,
    isLoading,
}: InputMessageCardProps) {
    return (
        <SectionCard title="Input Message">
            <textarea
                value={input}
                onChange={(event) => onInputChange(event.target.value)}
                className="h-64 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-5 text-base text-slate-100 outline-none transition focus:border-cyan-400"
                placeholder="Paste a user message here..."
            />

            <button
                onClick={onAnalyze}
                disabled={isLoading}
                className="mt-6 rounded-xl bg-cyan-500 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? "Analyzing..." : "Analyze & Validate"}
            </button>
        </SectionCard>
    );
}