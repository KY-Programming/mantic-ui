export interface FormValidation {
    label?: string;
    message: string | undefined;
    valid: boolean;
    value: unknown;
}

export function isFormValidation(value: unknown): value is FormValidation {
    return typeof value === 'object' && value !== null && typeof (value as FormValidation).valid === 'boolean';
}
