import { BooleanLike } from '../models/boolean-like';

export const toBoolean = (value: BooleanLike): boolean => {
    return value === '' || value === true || value?.toString().toLowerCase() === 'true';
};
