import { map } from 'rxjs/operators';

export const mapVoid = () => {
    return map(() => void 0);
}
