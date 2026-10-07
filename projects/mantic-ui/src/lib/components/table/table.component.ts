import { NgTemplateOutlet } from '@angular/common';
import { afterRenderEffect, Component, effect, input, signal } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { Align } from './models/align';

@Component({
    selector: 'm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    imports: [NgTemplateOutlet],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.m-scrollable]': 'scrollable()',
        '[class.m-sticky-last-column]': 'scrollable() && stickyLastColumn()',
        '[style.--m-table-sticky-background]': 'stickyBackground()'
    }
})
export class TableComponent extends InvertibleComponent {
    public static readonly defaults = {
        inverted: signal(false)
    };
    private static colorProbe?: CanvasRenderingContext2D | null;
    protected readonly stickyBackground = signal<string | undefined>(undefined);
    public readonly notCelled = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly very = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly unstackable = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly aligned = input<Align>('middle');
    public readonly definition = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly collapsing = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly basic = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** Scrolls a table that is wider than its place horizontally inside its own frame, instead of overflowing the page. */
    public readonly scrollable = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** Keeps the last column (e.g. a row's "…" menu) in view while a scrollable table scrolls. Needs `scrollable`. */
    public readonly stickyLastColumn = input<boolean, BooleanLike>(false, { transform: toBoolean });

    public constructor() {
        super();
        this.classes.register('celled', 'very', 'basic', 'unstackable', 'aligned', 'definition', 'collapsing')
            .registerFixed('table');
        effect(() => this.classes.set('aligned', this.aligned()));
        effect(() => this.classes.set('basic', this.basic()));
        effect(() => this.classes.set('celled', !this.notCelled()));
        effect(() => this.classes.set('very', this.very()));
        effect(() => this.classes.set('unstackable', this.unstackable()));
        effect(() => this.classes.set('definition', this.definition()));
        effect(() => this.classes.set('collapsing', this.collapsing()));
        effect(() => this.refreshInverted(TableComponent.defaults.inverted()));
        // After rendering, as the theme classes decide the table's background
        afterRenderEffect(() => {
            this.inverted();
            this.basic();
            this.very();
            const isSticky = this.scrollable() && this.stickyLastColumn();
            this.stickyBackground.set(isSticky ? TableComponent.resolveBackground(this.elementRef.nativeElement) : undefined);
        });
    }

    /**
     * The sticky column has to hide the cells scrolling beneath it, but a basic or an inverted table has no background
     * of its own (it shows the page's), so the color is composed from the table and its ancestors up to the first opaque one.
     */
    private static resolveBackground(element: HTMLElement): string | undefined {
        this.colorProbe ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        const probe = this.colorProbe;
        if (!probe) {
            return undefined;
        }
        const layers: string[] = [];
        for (let current: HTMLElement | null = element; current; current = current.parentElement) {
            const color = getComputedStyle(current).backgroundColor;
            layers.unshift(color);
            if (this.paint(probe, [color])[3] === 255) {
                break;
            }
        }
        // The canvas behind the page is white, as is the browser's default
        const [red, green, blue] = this.paint(probe, ['#FFFFFF', ...layers]);
        return `rgb(${red.toString()} ${green.toString()} ${blue.toString()})`;
    }

    private static paint(probe: CanvasRenderingContext2D, colors: string[]): Uint8ClampedArray {
        probe.clearRect(0, 0, 1, 1);
        for (const color of colors) {
            probe.fillStyle = color;
            probe.fillRect(0, 0, 1, 1);
        }
        return probe.getImageData(0, 0, 1, 1).data;
    }
}
