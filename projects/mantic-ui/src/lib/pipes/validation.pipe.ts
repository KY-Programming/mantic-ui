import { FormValidation } from '../models/form-validation';

export interface ValidationPipe {
    transform(value: unknown | FormValidation, message?: string): FormValidation;
}
