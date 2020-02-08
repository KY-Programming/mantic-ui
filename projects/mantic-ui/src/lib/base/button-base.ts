import { Input } from '@angular/core';
import { ColorName } from '../models/color';
import { ElementBase } from './element-base';

export class ButtonBase extends ElementBase {

    @Input()
    public inverted: boolean;

    @Input()
    public primary: boolean;

    @Input()
    public secondary: boolean;

    @Input()
    public positive: boolean;

    @Input()
    public negative: boolean;

    @Input()
    public color: ColorName;

    @Input()
    public basic: boolean;

    @Input()
    public active: boolean;

    @Input()
    public disabled: boolean;

    @Input()
    public loading: boolean;

    @Input()
    public size: string;

    public constructor() {
        super();
        this.classList
            .register('size')
            .registerBoolean('inverted')
            .registerBoolean('primary')
            .registerBoolean('secondary')
            .registerBoolean('positive')
            .registerBoolean('negative')
            .register('color')
            .registerBoolean('basic')
            .registerBoolean('active')
            .registerBoolean('disabled')
            .registerBoolean('loading')
            .registerFixed('button', Number.MAX_VALUE - 1);
    }
}
