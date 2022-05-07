import { Component, ContentChild, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ExpanderHeaderComponent } from './expander-header.component';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss']
})
export class ExpanderComponent extends BaseComponent {
    private isExpanded: boolean;

    @Input()
    public header: string | undefined;

    @ContentChild(ExpanderHeaderComponent)
    public headerTemplate: ExpanderHeaderComponent | undefined;

    @Input()
    public get expanded(): boolean {
        return this.isExpanded;
    }

    public set expanded(value: boolean | string) {
        this.isExpanded = this.toBoolean(value);
    }

    public constructor(
        elementRef: ElementRef
    ) {
        super(elementRef);
        this.classList.registerFixed('fluid', 'styled', 'accordion');
    }

    public toggle(): void {
        if (this.isExpanded) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    public collapse(): void {
        this.isExpanded = false;
    }

    public expand(): void {
        this.isExpanded = true;
    }
}
