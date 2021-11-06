export class BaseDirective {

    protected toBoolean(value: boolean | string): boolean {
        return value === '' || value === true || value?.toString().toLowerCase() === 'true';
    }

}
