import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Mouse } from '../helpers/mouse';
import { animationFrameScheduler, fromEvent } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { Math2 } from '../helpers/math2';
import { takeUntil } from 'rxjs/operators';
import { ContextMenuEvent } from './models/context-menu-event';
import { ContextMenuMouseEvent } from './models/context-menu-mouse-event';

@Component({
    selector: 'm-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent extends BaseComponent implements AfterViewInit {
    private isOpenOnLeftClick = false;
    private isOpenOnRightClick = true;
    private isVertical = true;
    private isShared: boolean;
    public left: number;

    public top: number;
    @HostBinding('class.visible')
    public isVisible = false;

    @Input()
    public get openOnLeftClick(): boolean {
        return this.isOpenOnLeftClick;
    }

    public set openOnLeftClick(value: boolean | string) {
        this.isOpenOnLeftClick = this.toBoolean(value);
    }

    @Input()
    public get openOnRightClick(): boolean {
        return this.isOpenOnRightClick;
    }

    public set openOnRightClick(value: boolean | string) {
        this.isOpenOnRightClick = this.toBoolean(value);
    }

    @Input()
    public get vertical(): boolean {
        return this.isVertical;
    }

    public set vertical(value: string | boolean) {
        this.isVertical = this.toBoolean(value);
    }

    @Input()
    public get shared(): boolean {
        return this.isShared;
    }

    public set shared(value: string | boolean) {
        this.isShared = this.toBoolean(value);
    }

    @Input()
    public margin = 5;

    @ViewChild(MenuComponent)
    public menu: MenuComponent;

    public constructor(
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
        this.classList.register('openOnLeftClick', 'openOnRightClick', 'vertical', 'margin', 'shared');
    }

    public ngAfterViewInit(): void {
        if (!this.isShared) {
            fromEvent(this.elementRef.nativeElement.parentElement, 'click').pipe(takeUntil(this.destroy)).subscribe((event: MouseEvent) => this.onParentClick(event));
            fromEvent(this.elementRef.nativeElement.parentElement, 'contextmenu').pipe(takeUntil(this.destroy)).subscribe((event: MouseEvent) => this.onParentClick(event));
        }
        fromEvent(document.documentElement, 'scroll', { capture: true }).pipe(takeUntil(this.destroy)).subscribe(event => this.onOutsideAction(event));
    }

    private onParentClick(event: ContextMenuMouseEvent): void {
        if (event.button === Mouse.left && !this.isOpenOnLeftClick) {
            return;
        }
        if (event.button === Mouse.right && !this.isOpenOnRightClick) {
            return;
        }
        this.open(event);
    }

    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:keydown', ['$event'])
    private onOutsideAction(event: ContextMenuEvent): void {
        if (!this.isVisible) {
            return;
        }
        if (event.contextMenuTarget === this || (event as KeyboardEvent).key === 'F8') {
            return;
        }
        if ((event.target as HTMLElement).closest('m-context-menu-item')) {
            return;
        }
        this.close();
    }

    private refreshPosition(): void {
        const menuRect = this.menu.elementRef.nativeElement.getBoundingClientRect();
        const clipRect = document.documentElement.getBoundingClientRect();
        this.left = Math2.keepInRange(clipRect.left + this.margin, this.left, clipRect.right - this.margin - menuRect.width);
        this.top = Math2.keepInRange(clipRect.top + this.margin, this.top, clipRect.bottom - this.margin - menuRect.height);
    }

    public open(left?: number, top?: number): void
    public open(event: MouseEvent): void
    public open(leftOrEvent?: number | ContextMenuMouseEvent, top?: number): void {
        if (typeof leftOrEvent === 'number') {
            this.left = leftOrEvent ?? this.left;
            this.top = top ?? this.top;
        } else {
            leftOrEvent.preventDefault();
            leftOrEvent.contextMenuTarget = this;
            this.left = leftOrEvent.clientX;
            this.top = leftOrEvent.clientY;
        }
        this.isVisible = true;
        animationFrameScheduler.schedule(() => this.refreshPosition());
    }

    public close(): void {
        this.isVisible = false;
    }
}

