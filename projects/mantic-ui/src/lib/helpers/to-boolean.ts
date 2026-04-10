import { BooleanLike } from '../models/boolean-like';

export const toBoolean = (value: BooleanLike): boolean => {
    return value === '' || value === true || value?.toString().toLowerCase() === 'true';
};

export const toBooleanWithUndefined = (value: BooleanLike): boolean | undefined => {
    return value === undefined ? undefined : toBoolean(value);
};
