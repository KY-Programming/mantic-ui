import { ElementRef, Input } from '@angular/core';
import { DimmableService } from '../services/dimmable.service';
import { ElementBase } from './element-base';

export class DimmableComponent extends ElementBase {
    @Input()
    public set dimmable(value: boolean) {
        this.dimmableService.dimmable = value;
    }
    public get dimmable(): boolean {
        return this.dimmableService.dimmable;
    }

    public isDimmed = false;

    constructor(
        elementRef: ElementRef<HTMLElement>,
        private readonly dimmableService: DimmableService
    ) {
        super(elementRef);
        this.classList
            .registerBoolean('dimmable')
            .registerBoolean('isDimmed', 'dimmed');
        this.dimmableService.dimmed.subscribe(value => {
            this.isDimmed = value;
            this.refreshClasses();
        });
    }
}
