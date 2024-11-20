import { Pipe, PipeTransform } from '@angular/core';
import { FormValidation, isFormValidation, ValidationPipe } from '@mantic-ui/angular';

@Pipe({
    name: 'myValidation'
})
export class MyValidationPipe implements ValidationPipe, PipeTransform {
    public transform(value: unknown, ...args: unknown[]): FormValidation {
        // Check the type of value and returns the FormValidation from previous validation step or undefined
        const validation = isFormValidation(value) ? value : undefined;
        // Check if the previous validation is already invalid and stop validation
        if (validation && !validation.valid) {
            return validation;
        }
        // In this example we only check strings. All other types where converted to undefined to force an invalid result
        const rawValue = validation ? validation.value : value;
        const stringValue = typeof rawValue === 'string' ? rawValue : undefined;
        return {
            // Do the validation
            valid: !!stringValue && stringValue.indexOf('a') >= 0,
            // Create an validation message. args[0] can be used to override the validation message
            message: value ? undefined : args[0] as string || 'has to contain at least one \'a\'',
            // Provide the value for the next validation step
            value
        };
    }
}
