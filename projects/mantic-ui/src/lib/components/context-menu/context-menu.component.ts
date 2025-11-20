import { AfterViewInit, Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { animationFrameScheduler, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { ToBodyDirective } from '../../directives/to-body.directive';
import { Math2 } from '../../helpers/math2';
import { Mouse } from '../../helpers/mouse';
import { BooleanLike } from '../../models/boolean-like';
import { MenuComponent } from '../menu/menu.component';
import { ContextMenuEvent } from './models/context-menu-event';
import { ContextMenuMouseEvent } from './models/context-menu-mouse-event';

@Component({
    selector: 'm-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    imports: [
        MenuComponent,
        ToBodyDirective
    ],
    providers: [...BaseComponent.providers]
})
export class ContextMenuComponent extends BaseComponent implements AfterViewInit {
    private isOpenOnLeftClick = false;
    private isOpenOnRightClick = true;
    private isVertical = true;
    private isShared = false;

    public left: number | undefined;
    public top: number | undefined;

    @HostBinding('class.visible')
    public isVisible = false;

    @Input()
    public get openOnLeftClick(): boolean {
        return this.isOpenOnLeftClick;
    }

    public set openOnLeftClick(value: BooleanLike) {
        this.isOpenOnLeftClick = this.toBoolean(value);
    }

    @Input()
    public get openOnRightClick(): boolean {
        return this.isOpenOnRightClick;
    }

    public set openOnRightClick(value: BooleanLike) {
        this.isOpenOnRightClick = this.toBoolean(value);
    }

    @Input()
    public get vertical(): boolean {
        return this.isVertical;
    }

    public set vertical(value: BooleanLike) {
        this.isVertical = this.toBoolean(value);
    }

    @Input()
    public get shared(): boolean {
        return this.isShared;
    }

    public set shared(value: BooleanLike) {
        this.isShared = this.toBoolean(value);
    }

    @Input()
    public margin = 5;

    // eslint-disable-next-line @angular-eslint/no-output-rename
    @Output('close')
    public readonly onclose = new EventEmitter<void>();

    // eslint-disable-next-line @angular-eslint/no-output-rename
    @Output('open')
    public readonly onopen = new EventEmitter<void>();

    @ViewChild(MenuComponent)
    protected menu: MenuComponent | undefined;

    public constructor() {
        super();
        this.classes.register('openOnLeftClick', 'openOnRightClick', 'vertical', 'margin', 'shared');
    }

    public ngAfterViewInit(): void {
        if (!this.isShared && this.elementRef.nativeElement.parentElement) {
            fromEvent(this.elementRef.nativeElement.parentElement, 'click').pipe(takeUntil(this.destroy)).subscribe(event => this.onParentClick(event as ContextMenuMouseEvent));
            fromEvent(this.elementRef.nativeElement.parentElement, 'contextmenu').pipe(takeUntil(this.destroy)).subscribe(event => this.onParentClick(event as ContextMenuMouseEvent));
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
    protected onOutsideAction(event: ContextMenuEvent): void {
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

    private refreshPosition(tries = 3): void {
        if (!this.menu) {
            if (tries > 0) {
                animationFrameScheduler.schedule(() => this.refreshPosition(tries - 1));
            }
            return;
        }
        const menuRect = this.menu.element.nativeElement.getBoundingClientRect();
        const clipRect = document.documentElement.getBoundingClientRect();
        this.left = Math2.keepInRange(clipRect.left + this.margin, this.left, clipRect.right - this.margin - menuRect.width);
        this.top = Math2.keepInRange(clipRect.top + this.margin, this.top, clipRect.bottom - this.margin - menuRect.height);
    }

    public open(left?: number, top?: number): void
    public open(event: MouseEvent): void
    public open(leftOrEvent?: number | ContextMenuMouseEvent, top?: number): void {
        if (typeof leftOrEvent === 'number' || leftOrEvent === undefined) {
            this.left = leftOrEvent ?? this.left;
            this.top = top ?? this.top;
        }
        else {
            leftOrEvent.preventDefault();
            leftOrEvent.contextMenuTarget = this;
            this.left = leftOrEvent.clientX;
            this.top = leftOrEvent.clientY;
        }
        this.isVisible = true;
        this.refreshPosition();
        this.onopen.emit();
    }

    public close(): void {
        this.isVisible = false;
        this.onclose.emit();
    }
}

