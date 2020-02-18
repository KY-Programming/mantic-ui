import { ElementRef, Injectable, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ElementBase } from './element-base';

@Injectable()
export class DimmableService {
    private readonly dimmedSubject = new ReplaySubject<boolean>(1);

    public dimmable = false;
    public readonly dimmed = this.dimmedSubject.asObservable();

    public dim(value = true): void {
        this.dimmedSubject.next(value);
    }
}

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
