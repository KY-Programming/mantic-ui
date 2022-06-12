import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { ColorName } from '../models/color';
import { BaseDirective } from '../base/base.directive';
import { BooleanLike } from '../models/boolean-like';
import { ButtonBaseComponent } from '../base/button-base.component';

@Directive({
    selector: '[m-button]'
})
export class ButtonDirective extends ButtonBaseComponent {
    public constructor() {
        super();
    }
}
