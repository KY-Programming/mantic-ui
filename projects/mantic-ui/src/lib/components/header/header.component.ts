
import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { InvertibleComponent } from '../../base/invertible.component';
import { IconSize } from '../icon/icon-size';
import { IconType } from '../icon/icon-type';
import { IconComponent } from '../icon/icon.component';

export declare type HeaderSize = 'huge' | 'large' | 'medium' | 'small' | 'tiny';

@Component({
    selector: 'm-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
    IconComponent
],
    providers: [...BaseComponent.providers]
})
export class HeaderComponent extends InvertibleComponent implements OnInit {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    private sizeValue: HeaderSize | undefined;

    @Input()
    public icon: IconType | undefined;

    @Input()
    public iconSize: IconSize;

    @Input()
    public get size(): HeaderSize | undefined {
        return this.sizeValue;
    }

    public set size(value: HeaderSize | undefined) {
        this.sizeValue = value;
        this.classes.set('size', value);
    }

    public constructor() {
        super();
        this.classes.register('size', 'iconSize')
            .registerFixed('header');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        HeaderComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }
}
