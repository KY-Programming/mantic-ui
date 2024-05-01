import { Directive, HostBinding, inject, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseDirective } from '../base/base.directive';
import { HeaderComponent } from '../components/header/header.component';
import { BooleanLike } from '../models/boolean-like';
import { InvertedDirective } from './inverted.directive';

@Directive({
    selector: '[m-header]',
    standalone: true,
    hostDirectives: [InvertedDirective.default],
    providers: [...BaseDirective.providers]
})
export class HeaderDirective extends BaseDirective implements OnInit {
    private readonly invertedDirective = inject(InvertedDirective);
    private isDividing = false;
    private isIcon = false;

    public get inverted(): boolean {
        return this.invertedDirective.inverted;
    }

    public set inverted(value: BooleanLike) {
        this.invertedDirective.inverted = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.dividing')
    public get dividing(): boolean {
        return this.isDividing;
    }

    public set dividing(value: BooleanLike) {
        this.isDividing = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.icon')
    public get icon(): boolean {
        return this.isIcon;
    }

    public set icon(value: BooleanLike) {
        this.isIcon = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.sub')
    public sub = false;

    public constructor() {
        super();
        this.classes.registerFixed('header');
        this.validateAttributes = false;
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        HeaderComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.invertedDirective.setInvertedDefault(value));
    }
}
