import { Directive, HostBinding, inject, Input } from '@angular/core';
import { DimmableService } from '../services/dimmable.service';
import { InvertibleComponent } from './invertible.component';

@Directive()
export abstract class DimmableComponent extends InvertibleComponent {
    private readonly dimmableService = inject(DimmableService);

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

    protected constructor() {
        super();
        this.classList.register('dimmable', 'isDimmed');
        this.dimmableService.dimmed.subscribe(value => this.isDimmed = value);
    }
}
