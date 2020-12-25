import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent extends BaseComponent {
    private isCelled = true;
    private isUnstackable: boolean;

    @Input()
    @HostBinding('class.celled')
    public get celled(): boolean | string {
        return this.isCelled;
    }

    public set celled(value: string | boolean) {
        this.isCelled = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.unstackable')
    public get unstackable(): boolean | string {
        return this.isUnstackable;
    }

    public set unstackable(value: string | boolean) {
        this.isUnstackable = this.toBoolean(value);
    }

    @HostBinding('class.table')
    public readonly table = true;

    constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList
            .registerBoolean('celled')
            .registerBoolean('unstackable');
    }

}
