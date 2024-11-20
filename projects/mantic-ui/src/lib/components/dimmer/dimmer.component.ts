import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { BooleanLike } from '../../models/boolean-like';

// TODO: Enable animation

@Component({
    selector: 'm-dimmer',
    templateUrl: './dimmer.component.html',
    styleUrls: ['./dimmer.component.scss'],
    providers: [...InvertibleComponent.providers]
})
export class DimmerComponent extends InvertibleComponent implements OnInit, OnDestroy {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    private visibleValue = true;
    private isPage = false;
    private isHideOnClick = false;

    @Input()
    @HostBinding('class.page')
    public get page(): boolean {
        return this.isPage;
    }

    public set page(value: BooleanLike) {
        this.isPage = this.toBoolean(value);
    }

    // @Input()
    // public useContent = true;

    @Input()
    public get hideOnClick(): boolean {
        return this.isHideOnClick;
    }

    public set hideOnClick(value: BooleanLike) {
        this.isHideOnClick = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.visible')
    @HostBinding('class.active')
    public get visible(): boolean {
        return this.visibleValue;
    }

    public set visible(value: BooleanLike) {
        if (this.toBoolean(value)) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    public constructor() {
        super();
        this.classes.register('page', 'visible')
            .registerFixed('dimmer');
        DimmerComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        if (this.visible === undefined) {
            this.show();
        }
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.hide();
    }

    public show(): void {
        this.visibleValue = true;
        this.refreshClasses();
    }

    public hide(): void {
        this.visibleValue = false;
        this.refreshClasses();
    }

    @HostListener('click')
    private onClick(): void {
        if (this.hideOnClick) {
            this.hide();
        }
    }
}
