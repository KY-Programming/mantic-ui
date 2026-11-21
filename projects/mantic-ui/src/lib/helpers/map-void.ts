import { map } from 'rxjs';

export const mapVoid = () => {
    return map(() => void 0);
}
