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
    private textValue: string;
    private sizeValue: LoaderSize;

    @Input()
    public get text(): string {
        return this.textValue;
    }

    public set text(value: string) {
        this.textValue = value;
        this.classes.set('text', value || value === '');
    }

    @Input()
    public get size(): LoaderSize {
        return this.sizeValue;
    }

    public set size(value: LoaderSize) {
        this.sizeValue = value;
        this.classes.set('size', value);
    }

    public constructor() {
        super();
        this.classes.register('text', 'size')
            .registerFixed('loader');
    }

}
