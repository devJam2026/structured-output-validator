export function AppHeader() {
    return (
        <header className="max-w-4xl">
            <p className="text-lg font-bold text-cyan-400">
                DevJam LLM Fundamentals · Project 5
            </p>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-100">
                Structured Output Validator
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-400">
                Learn how to convert unpredictable LLM text into reliable JSON that your
                application can validate, parse, store, and safely use.
            </p>
        </header>
    );
}