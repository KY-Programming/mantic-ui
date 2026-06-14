import { AfterViewInit, Component, input, output, signal, viewChild } from '@angular/core';
import { animationFrameScheduler, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { ToBodyDirective } from '../../directives/to-body.directive';
import { Math2 } from '../../helpers/math2';
import { Mouse } from '../../helpers/mouse';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { MenuComponent } from '../menu/menu.component';
import { ContextMenuEvent } from './models/context-menu-event';
import { ContextMenuMouseEvent } from './models/context-menu-mouse-event';

@Component({
    selector: 'm-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    imports: [MenuComponent, ToBodyDirective],
    providers: [...BaseComponent.providers],
    host: {
        '[class.visible]': 'isVisible()',
        '(document:mousedown)': 'onOutsideAction($event)',
        '(document:keydown)': 'onOutsideAction($event)'
    }
})
export class ContextMenuComponent extends BaseComponent implements AfterViewInit {
    protected readonly menu = viewChild(MenuComponent);
    public readonly left = signal<number | undefined>(undefined);
    public readonly top = signal<number | undefined>(undefined);
    public readonly isVisible = signal(false);
    public readonly openOnLeftClick = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly openOnRightClick = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly vertical = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly shared = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly margin = input(5);

    // eslint-disable-next-line @angular-eslint/no-output-rename,@angular-eslint/no-output-native
    public readonly onclose = output({ alias: 'close' });

    // eslint-disable-next-line @angular-eslint/no-output-rename
    public readonly onopen = output({ alias: 'open' });

    public constructor() {
        super();
        this.classes.register('openOnLeftClick', 'openOnRightClick', 'vertical', 'margin', 'shared');
    }

    public ngAfterViewInit(): void {
        if (!this.shared() && this.elementRef.nativeElement.parentElement) {
            fromEvent(this.elementRef.nativeElement.parentElement, 'click').pipe(takeUntil(this.destroy)).subscribe(event => this.onParentClick(event as ContextMenuMouseEvent));
            fromEvent(this.elementRef.nativeElement.parentElement, 'contextmenu').pipe(takeUntil(this.destroy)).subscribe(event => this.onParentClick(event as ContextMenuMouseEvent));
        }
        fromEvent(document.documentElement, 'scroll', { capture: true }).pipe(takeUntil(this.destroy)).subscribe(event => this.onOutsideAction(event));
    }

    private onParentClick(event: ContextMenuMouseEvent): void {
        if (event.button === Mouse.left.valueOf() && !this.openOnLeftClick()) {
            return;
        }
        if (event.button === Mouse.right.valueOf() && !this.openOnRightClick()) {
            return;
        }
        this.open(event);
    }

    protected onOutsideAction(event: ContextMenuEvent): void {
        if (!this.isVisible()) {
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
        const menu = this.menu();
        if (!menu) {
            if (tries > 0) {
                animationFrameScheduler.schedule(() => this.refreshPosition(tries - 1));
            }
            return;
        }
        const menuRect = menu.element.nativeElement.getBoundingClientRect();
        const clipRect = document.documentElement.getBoundingClientRect();
        this.left.set(Math2.keepInRange(clipRect.left + this.margin(), this.left(), clipRect.right - this.margin() - menuRect.width));
        this.top.set(Math2.keepInRange(clipRect.top + this.margin(), this.top(), clipRect.bottom - this.margin() - menuRect.height));
    }

    public open(left?: number, top?: number): void
    public open(event: MouseEvent): void
    public open(leftOrEvent?: number | ContextMenuMouseEvent, top?: number): void {
        if (typeof leftOrEvent === 'number' || leftOrEvent === undefined) {
            this.left.set(leftOrEvent ?? this.left());
            this.top.set(top ?? this.top());
        }
        else {
            leftOrEvent.preventDefault();
            leftOrEvent.contextMenuTarget = this;
            this.left.set(leftOrEvent.clientX);
            this.top.set(leftOrEvent.clientY);
        }
        this.isVisible.set(true);
        this.refreshPosition();
        this.onopen.emit();
    }

    public close(): void {
        this.isVisible.set(false);
        this.onclose.emit();
    }
}
