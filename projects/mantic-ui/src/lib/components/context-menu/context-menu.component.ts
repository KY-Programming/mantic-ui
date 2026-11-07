import { afterNextRender, AfterViewInit, Component, computed, inject, Injector, input, output, signal, viewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
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
import { ContextMenuPosition } from './models/context-menu-position';

interface AxisPlacement {
    start: number;
    /** Set where the menu is longer than the room it gets, so it has to scroll. */
    maxSize?: number;
}

function fits(start: number, size: number, min: number, max: number): boolean {
    return start >= min && start + size <= max;
}

/**
 * Start of the menu on one axis: starting at `after` (opening right / down), else ending at `before` (opening left / up)
 * - each only where it fits - else pushed into the range `min`..`max`.
 */
function placeOnAxis(after: number, before: number, size: number, min: number, max: number): number {
    if (fits(after, size, min, max)) {
        return after;
    }
    if (fits(before - size, size, min, max)) {
        return before - size;
    }
    return Math2.keepInRange(min, after, max - size);
}

/**
 * As `placeOnAxis`, but where the menu fits on neither side it takes the side with more room and is limited to it, so
 * it scrolls instead of covering the point or element it opens at.
 */
function placeOnAxisLimited(after: number, before: number, size: number, min: number, max: number): AxisPlacement {
    if (fits(after, size, min, max) || fits(before - size, size, min, max)) {
        return { start: placeOnAxis(after, before, size, min, max) };
    }
    const roomAfter = max - Math.max(after, min);
    const roomBefore = Math.min(before, max) - min;
    return roomAfter >= roomBefore ? { start: Math.max(after, min), maxSize: roomAfter } : { start: min, maxSize: roomBefore };
}

/** At `point`, pushed into the range `min`..`max`; limited to the range where it is longer. */
function shiftOnAxis(point: number, size: number, min: number, max: number): AxisPlacement {
    return size > max - min ? { start: min, maxSize: max - min } : { start: Math2.keepInRange(min, point, max - size) };
}

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
    public static readonly defaults = {
        /** Set with `m-context-menu-defaults`, e.g. to the page's dark mode. */
        inverted: signal(false),
        /** Set with `m-context-menu-defaults`. `flip`, as the context menus of the operating systems and browsers. */
        position: signal<ContextMenuPosition>('flip')
    };

    private readonly injector = inject(Injector);
    protected readonly menu = viewChild(MenuComponent);
    public readonly left = signal<number | undefined>(undefined);
    public readonly top = signal<number | undefined>(undefined);
    /** Set while the menu is higher than the room it gets; it scrolls then. */
    protected readonly maxHeight = signal<number | undefined>(undefined);
    public readonly isVisible = signal(false);
    /** False from opening until the menu is moved into the viewport, so it never shows at the raw click position. */
    protected readonly isPositioned = signal(false);
    public readonly openOnLeftClick = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly openOnRightClick = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly vertical = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly shared = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly margin = input(5);
    /**
     * Dark menu; without it the default (`m-context-menu-defaults`). Passed to the menu rendered at the end of the page,
     * which can not inherit the dark mode of where it is used.
     */
    public readonly inverted = input<boolean | undefined, BooleanLike>(undefined, { transform: toBoolean });
    protected readonly isInverted = computed(() => this.inverted() ?? ContextMenuComponent.defaults.inverted());
    /** How the menu places itself (see `ContextMenuPosition`); without it the default (`m-context-menu-defaults`, else `flip`). */
    public readonly position = input<ContextMenuPosition>();
    protected readonly currentPosition = computed(() => this.position() ?? ContextMenuComponent.defaults.position());
    /** The element a menu with `position="anchor"` attaches to; without it the element it was opened on, else its parent. */
    public readonly anchor = input<HTMLElement>();
    /** The pointer (or the point passed to `open`), which `shift` and `flip` place the menu at. */
    private pointerLeft?: number;
    private pointerTop?: number;
    /** The element the menu was last opened on, for `anchor`. */
    private openedOn?: HTMLElement;
    /** The element passed to `open(element)`, which the menu attaches to whatever its `position`. */
    private openedAt?: HTMLElement;

    // eslint-disable-next-line @angular-eslint/no-output-rename,@angular-eslint/no-output-native
    public readonly onclose = output({ alias: 'close' });

    // eslint-disable-next-line @angular-eslint/no-output-rename
    public readonly onopen = output({ alias: 'open' });

    public constructor() {
        super();
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
        const target = event.target instanceof Element ? event.target : undefined;
        if (target?.closest('m-context-menu-item, m-context-menu-group')) {
            return;
        }
        // scrolling the menu itself (a menu too high for the viewport scrolls) keeps it open
        if (target && this.menu()?.element.nativeElement.contains(target)) {
            return;
        }
        this.close();
    }

    protected onContentClick(event: ContextMenuEvent): void {
        if (!event.keepContextMenuOpen && (event.target as HTMLElement).closest('m-context-menu-item')) {
            this.close();
        }
    }

    /** Places the rendered menu by its `position`, then shows it. */
    private refreshPosition(): void {
        const menu = this.menu();
        if (menu) {
            const { width, height } = menu.element.nativeElement.getBoundingClientRect();
            // the visible area of the page, without its scrollbars (the menu is fixed, so in viewport coordinates)
            const margin = this.margin();
            const minLeft = margin;
            const maxRight = document.documentElement.clientWidth - margin;
            const minTop = margin;
            const maxBottom = document.documentElement.clientHeight - margin;
            const pointerLeft = this.pointerLeft ?? 0;
            const pointerTop = this.pointerTop ?? 0;
            const anchor = this.openedAt ?? (this.currentPosition() === 'anchor' ? this.anchor() ?? this.openedOn ?? this.elementRef.nativeElement.parentElement : undefined);
            // Too wide a menu is only pushed into the viewport (no sideways scrolling); too high a menu scrolls
            let left: number;
            let vertical: AxisPlacement;
            if (anchor) {
                const anchorRect = anchor.getBoundingClientRect();
                left = placeOnAxis(anchorRect.left, anchorRect.right, width, minLeft, maxRight);
                vertical = placeOnAxisLimited(anchorRect.bottom, anchorRect.top, height, minTop, maxBottom);
            }
            else if (this.currentPosition() === 'flip') {
                left = placeOnAxis(pointerLeft, pointerLeft, width, minLeft, maxRight);
                vertical = placeOnAxisLimited(pointerTop, pointerTop, height, minTop, maxBottom);
            }
            else {
                // shift, and an anchor menu with nothing to attach to
                left = Math2.keepInRange(minLeft, pointerLeft, maxRight - width);
                vertical = shiftOnAxis(pointerTop, height, minTop, maxBottom);
            }
            this.left.set(left);
            this.top.set(vertical.start);
            this.maxHeight.set(vertical.maxSize);
        }
        // shown even without a menu to measure, so it can never stay invisible
        this.isPositioned.set(true);
    }

    /** Opens the menu at the given point (without one at the last one), or - with `position="anchor"` - at its anchor (else its parent). */
    public open(left?: number, top?: number): void
    /** Opens the menu at the pointer of the event, or - with `position="anchor"` - at the element the event was handled on. */
    public open(event: MouseEvent): void
    /**
     * Opens the menu at the element, placed as with `position="anchor"` whatever its `position` - for an opening without
     * a pointer (keyboard), where the menu belongs to an element instead of a point.
     */
    public open(element: HTMLElement): void
    public open(target?: number | ContextMenuMouseEvent | HTMLElement, top?: number): void {
        this.openedAt = undefined;
        this.openedOn = undefined;
        if (target instanceof HTMLElement) {
            this.openedAt = target;
        }
        else if (typeof target === 'number' || target === undefined) {
            this.pointerLeft = target ?? this.pointerLeft;
            this.pointerTop = top ?? this.pointerTop;
        }
        else {
            target.preventDefault();
            target.contextMenuTarget = this;
            this.pointerLeft = target.clientX;
            this.pointerTop = target.clientY;
            this.openedOn = target.currentTarget instanceof HTMLElement ? target.currentTarget : undefined;
        }
        // The menu can only be measured once it is rendered: until then it stays hidden (also when it is moved while
        // open), and it is measured right after that render, before the browser paints it
        this.isPositioned.set(false);
        // measured at its full height, the limit of the last opening would hide how high it is
        this.maxHeight.set(undefined);
        this.isVisible.set(true);
        afterNextRender({ read: () => this.refreshPosition() }, { injector: this.injector });
        this.onopen.emit();
    }

    public close(): void {
        this.isVisible.set(false);
        this.onclose.emit();
    }
}
