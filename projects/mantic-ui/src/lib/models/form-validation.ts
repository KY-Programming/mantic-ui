export interface FormValidation {
    label?: string;
    message: string;
    valid: boolean;
    value: unknown;
}

export function isFormValidation(value: unknown): value is FormValidation {
    const validation = value as FormValidation;
    return validation && typeof validation.valid === 'boolean';
}
