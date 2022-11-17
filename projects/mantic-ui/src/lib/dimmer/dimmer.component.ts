import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { DimmableService } from '../services/dimmable.service';
import { BooleanLike } from '../models/boolean-like';
import { InvertibleComponent } from '../base/invertible.component';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// TODO: Enable animation

@Component({
    selector: 'm-dimmer',
    templateUrl: './dimmer.component.html',
    styleUrls: ['./dimmer.component.scss']
})
export class DimmerComponent extends InvertibleComponent implements OnInit, OnDestroy {
    public static readonly defaults = {
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    private visibleValue: boolean;
    private isPage: boolean;

    @Input()
    @HostBinding('class.page')
    public get page(): boolean {
        return this.isPage;
    }

    public set page(value: BooleanLike) {
        this.isPage = this.toBoolean(value);
    }

    @Input()
    public useContent = true;

    @Input()
    public hideOnClick = true;

    @Input()
    @HostBinding('class.visible')
    @HostBinding('class.active')
    public get visible(): boolean {
        return this.visibleValue;
    }

    public set visible(value: BooleanLike) {
        if (this.toBoolean(value)) {
            this.show();
        } else {
            this.hide();
        }
    }

    @HostBinding('class.dimmer')
    public readonly dimmer = true;

    public constructor(
        @Optional() private readonly dimmableService: DimmableService
    ) {
        super();
        this.classList.register('page', 'visible');
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
        if (this.dimmableService) {
            this.dimmableService.dim();
        }
        this.refreshClasses();
    }

    public hide(): void {
        this.visibleValue = false;
        if (this.dimmableService) {
            this.dimmableService.dim(false);
        }
        this.refreshClasses();
    }

    @HostListener('click')
    public onClick(): void {
        if (this.hideOnClick) {
            this.hide();
        }
    }
}
