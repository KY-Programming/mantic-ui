import { Signal } from '@angular/core';
import { LabelPosition } from './label-position';

export interface LabelOptions {
    position: Signal<LabelPosition>;
}
