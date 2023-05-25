import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { InvertedDirective } from '../../directives/inverted.directive';
import { CommonModule } from '@angular/common';
import { ActiveDirective } from '../../directives/active.directive';
import { InlineDirective } from '../../directives/inline.directive';

export declare type LoaderSize = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';

@Component({
    selector: 'm-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ],
    hostDirectives: [...BaseComponent.directives, InvertedDirective.default, ActiveDirective.default, InlineDirective.default],
    providers: [...BaseComponent.providers]
})
export class LoaderComponent extends BaseComponent {
    private textValue: string | undefined;
    private sizeValue: LoaderSize | undefined;

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

    public constructor() {
        super();
        this.classes.register('text', 'size')
            .registerFixed('loader');
    }

}
