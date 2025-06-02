import { Component, HostBinding, inject, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { ColorDirective } from '../../directives/color.directive';
import { BooleanLike } from '../../models/boolean-like';
import { ColorName } from '../../models/color';

@Component({
    selector: 'm-circular-progress',
    templateUrl: './circular-progress.component.html',
    styleUrls: ['./circular-progress.component.scss'],
    hostDirectives: [ColorDirective.default],
    imports: [],
    providers: [...BaseComponent.providers]
})
export class CircularProgressComponent extends BaseComponent {
    private readonly colorDirective = inject(ColorDirective, { self: true });
    private isSuccess = false;
    private isWarning = false;
    private isError = false;

    @Input({ required: true })
    public value = 0;

    @Input()
    public min = 0;

    @Input()
    public max = 100;

    @Input()
    public size = 160;

    @Input()
    public strokeWidth = 12;

    @Input()
    public centerContent = true;

    @HostBinding('class.ui')
    @HostBinding('class.progress')
    @HostBinding('class.circular')
    protected readonly host = true;

    @Input()
    @HostBinding('class.success')
    public get success(): boolean {
        return this.isSuccess;
    }

    public set success(value: BooleanLike) {
        this.isSuccess = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.error')
    public get error(): boolean {
        return this.isError;
    }

    public set error(value: BooleanLike) {
        this.isError = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.warning')
    public get warning(): boolean {
        return this.isWarning;
    }

    public set warning(value: BooleanLike) {
        this.isWarning = this.toBoolean(value);
    }

    @HostBinding('class')
    protected get color(): ColorName | undefined {
        return this.colorDirective.color;
    }

    protected get radius(): number {
        return this.size / 2 - this.strokeWidth / 2;
    }

    protected get total(): number {
        return 2 * Math.PI * this.radius;
    }

    protected get offset(): number {
        const valueOffset = (this.value - this.min) / (this.max - this.min);
        return this.total * (1 - valueOffset);
    }

    public constructor() {
        super();
    }

}
