
import { Component, HostBinding, inject, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { ActiveDirective } from '../../directives/active.directive';
import { InlineDirective } from '../../directives/inline.directive';
import { InvertedDirective } from '../../directives/inverted.directive';
import { BooleanLike } from '../../models/boolean-like';

export declare type LoaderSize = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';

@Component({
    selector: 'm-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    imports: [],
    hostDirectives: [InvertedDirective.default, ActiveDirective.default, InlineDirective.default],
    providers: [...BaseComponent.providers]
})
export class LoaderComponent extends BaseComponent {
    private readonly activeDirective = inject(ActiveDirective);
    private textValue: string | undefined;
    private sizeValue: LoaderSize | undefined;
    private isInline = false;

    @Input()
    public get text(): string | undefined {
        return this.textValue;
    }

    public set text(value: string | undefined) {
        this.textValue = value;
        this.classes.set('text', value || value === '');
    }

    @Input()
    public get size(): LoaderSize | undefined {
        return this.sizeValue;
    }

    public set size(value: LoaderSize | undefined) {
        this.sizeValue = value;
        this.classes.set('size', value);
    }

    @Input()
    @HostBinding('class.inline')
    public get inline(): boolean {
        return this.isInline;
    }

    public set inline(value: BooleanLike) {
        this.isInline = this.toBoolean(value);
    }

    public constructor() {
        super();
        this.activeDirective.active = true;
        this.classes.register('text', 'size')
            .registerFixed('loader');
    }

}
