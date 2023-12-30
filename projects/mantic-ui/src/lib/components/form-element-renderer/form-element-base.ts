import { FormDataElement } from '../form-renderer/form-layout';

export interface FormElementBase {
    element: FormDataElement | undefined;
    data: unknown | undefined;
}
