import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { DimmableService } from '../services/dimmable.service';
import { BaseComponent } from './base.component';

@Component({
    template: ''
})
export class DimmableComponent extends BaseComponent {
    public get dimmable(): boolean {
        return this.dimmableService.dimmable;
    }

    @Input()
    @HostBinding('class.dimmable')
    public set dimmable(value: boolean | '') {
        this.dimmableService.dimmable = value || value === '';
    }

    @HostBinding('class.dimmed')
    public isDimmed = false;

    constructor(
        elementRef: ElementRef<HTMLElement>,
        private readonly dimmableService: DimmableService
    ) {
        super(elementRef);
        this.classList.register('dimmable', 'isDimmed');
        this.dimmableService.dimmed.subscribe(value => this.isDimmed = value);
    }
}
