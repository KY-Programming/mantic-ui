import { FormValidation } from '../models/form-validation';

export interface ValidationPipe {
    transform(value: unknown | FormValidation, ...args: unknown[]): FormValidation;
}
