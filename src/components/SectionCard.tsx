type SectionCardProps = {
    title: string;
    children: React.ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
            <div className="mt-6">{children}</div>
        </section>
    );
}