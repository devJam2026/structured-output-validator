import type { ScamAnalysis } from "../lib/schema";

export type ValidationError = {
    path: string;
    message: string;
};

export type ValidationResult =
    | {
        isValid: true;
        parsed: ScamAnalysis;
        errors: [];
    }
    | {
        isValid: false;
        parsed: null;
        errors: ValidationError[];
    };