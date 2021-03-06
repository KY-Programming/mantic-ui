import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { DimmableService } from '../services/dimmable.service';
import { BaseComponent } from '../base/base.component';

// TODO: Enable animation

@Component({
    selector: 'm-dimmer',
    templateUrl: './dimmer.component.html',
    styleUrls: ['./dimmer.component.scss']
})
export class DimmerComponent extends BaseComponent implements OnInit, OnDestroy {
    private visibleValue: boolean;
    private isPage: boolean;

    @Input()
    @HostBinding('class.page')
    public get page(): boolean | string {
        return this.isPage;
    }

    public set page(value: string | boolean) {
        this.isPage = this.toBoolean(value);
    }

    @Input()
    public useContent = true;

    @Input()
    public hideOnClick = true;

    @Input()
    @HostBinding('class.visible')
    @HostBinding('class.active')
    public get visible(): boolean | string {
        return this.visibleValue;
    }

    public set visible(value: boolean | string) {
        if (this.toBoolean(value)) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    @HostBinding('class.dimmer')
    public readonly dimmer = true;

    constructor(
        elementRef: ElementRef<HTMLElement>,
        @Optional() private readonly dimmableService: DimmableService
    ) {
        super(elementRef);
        this.classList.register('page', 'visible');
    }

    public ngOnInit(): void {
        super.ngOnInit();
        if (this.visible === undefined) {
            this.show();
        }
    }

    public show(): void {
        this.visibleValue = true;
        if (this.dimmableService) {
            this.dimmableService.dim();
        }
        this.refreshClasses();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.hide();
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
