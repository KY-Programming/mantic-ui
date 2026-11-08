import { afterNextRender, Component, computed, effect, ElementRef, inject, Injector, input, output, signal, untracked, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttachedDirective } from '../../../directives/attached.directive';
import { FallbackForDirective } from '../../../directives/fallback-for.directive';
import { ToBodyDirective } from '../../../directives/to-body.directive';
import { ColorHelper, Hsva, Rgba } from '../../../helpers/color-helper';
import { toBoolean } from '../../../helpers/to-boolean';
import { BooleanLike } from '../../../models/boolean-like';
import { LabelPosition } from '../../../models/label-position';
import { IconComponent } from '../../icon/icon.component';
import { InputBaseComponent } from '../input-base.component';
import { ColorPreset } from './models/color-preset';

interface ResolvedPreset {
    hex: string;
    name?: string;
}

/** Space between the field and the picker, and between the picker and the edge of the window, in px */
const popupGap = 4;
const viewportMargin = 8;
const transparent = '#00000000';

@Component({
    selector: 'm-color-input',
    templateUrl: './color-input.component.html',
    styleUrls: ['./color-input.component.scss'],
    imports: [FormsModule, FallbackForDirective, ToBodyDirective, IconComponent],
    providers: [...InputBaseComponent.providers],
    hostDirectives: [AttachedDirective.default]
})
export class ColorInputComponent extends InputBaseComponent {
    /** The colours of the Semantic / Fomantic UI palette */
    public static readonly themePresets: readonly ColorPreset[] = [
        { color: '#db2828', name: 'Red' },
        { color: '#f2711c', name: 'Orange' },
        { color: '#fbbd08', name: 'Yellow' },
        { color: '#b5cc18', name: 'Olive' },
        { color: '#21ba45', name: 'Green' },
        { color: '#00b5ad', name: 'Teal' },
        { color: '#2185d0', name: 'Blue' },
        { color: '#6435c9', name: 'Violet' },
        { color: '#a333c8', name: 'Purple' },
        { color: '#e03997', name: 'Pink' },
        { color: '#a5673f', name: 'Brown' },
        { color: '#767676', name: 'Grey' },
        { color: '#1b1c1d', name: 'Black' },
        { color: '#ffffff', name: 'White' }
    ];
    public static override readonly defaults = {
        ...InputBaseComponent.defaults,
        /** The colours every picker offers, unless it gets its own `presets`. A theme sets its palette here (or with `m-color-input-defaults`) */
        presets: signal<readonly ColorPreset[]>(ColorInputComponent.themePresets),
        pickText: signal('Pick a color'),
        transparentText: signal('Transparent')
    };
    private readonly injector = inject(Injector);
    private readonly popup = viewChild<ElementRef<HTMLElement>>('popup');
    private readonly swatch = viewChild<ElementRef<HTMLButtonElement>>('swatch');
    protected readonly valueState = signal<string | undefined>(undefined);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly valueInput = input<string | undefined>(undefined, { alias: 'value' });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly textInput = input<string | undefined>(undefined, { alias: 'text' });
    public readonly default = input('');
    /** Allows see-through colours: the value becomes `#rrggbbaa` when the colour is not opaque */
    public readonly alpha = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** The colours offered in the picker; without it the global ones (`ColorInputComponent.defaults.presets`), an empty list shows none */
    public readonly presets = input<readonly ColorPreset[]>();
    /** Accessible name of the colour button */
    public readonly pickText = input<string>();
    /** Tooltip of the fully transparent preset, offered with `alpha` */
    public readonly transparentText = input<string>();
    public readonly value = computed(() => this.valueState());
    public readonly text = computed(() => this.valueState() ?? this.default());
    public readonly valueChange = output<string | undefined>();
    public readonly textChange = output<string>();
    protected readonly isOpen = signal(false);
    protected readonly popupLeft = signal(0);
    protected readonly popupTop = signal(0);
    /** False from opening until the picker is moved next to the field, so it never shows at a wrong place */
    protected readonly isPositioned = signal(false);
    /** The colour the picker shows; kept apart from the value, so the hue stays where it was for greys, black and white */
    protected readonly hsva = signal<Hsva>({ h: 0, s: 0, v: 0, a: 1 });
    protected readonly color = computed(() => this.parse(this.text()));
    protected readonly hex = computed(() => {
        const color = this.color();
        return color ? ColorHelper.toHex(color, this.alpha()) : undefined;
    });
    /** The colour the picker starts from and the swatch shows: the value; in an empty field a placeholder that is a colour, else `default`. */
    private readonly baseColor = computed(() => {
        const value = this.valueState();
        return value?.trim() ? this.parse(value) : this.parse(this.placeholder()) ?? this.parse(this.default());
    });
    protected readonly swatchHex = computed(() => {
        const color = this.baseColor();
        return color ? ColorHelper.toHex(color, this.alpha()) : undefined;
    });
    protected readonly hueColor = computed(() => `hsl(${String(this.hsva().h)} 100% 50%)`);
    protected readonly opaqueColor = computed(() => ColorHelper.toHex({ ...ColorHelper.toRgba(this.hsva()), a: 1 }));
    protected readonly resolvedPresets = computed(() => {
        const resolved: ResolvedPreset[] = [];
        const presets = this.presets() ?? ColorInputComponent.defaults.presets();
        for (const preset of presets) {
            const { color: text, name } = typeof preset === 'string' ? { color: preset, name: undefined } : preset;
            const color = this.parse(text);
            if (color) {
                resolved.push({ hex: ColorHelper.toHex(color, this.alpha()), name });
            }
        }
        // With opacity a fully transparent colour is offered as well, unless the list has one already or shows no presets at all
        if (this.alpha() && resolved.length > 0 && resolved.every(preset => preset.hex.length !== 9 || !preset.hex.endsWith('00'))) {
            resolved.push({ hex: transparent, name: this.transparentText() ?? ColorInputComponent.defaults.transparentText() });
        }
        return resolved;
    });
    protected readonly currentPickText = computed(() => this.pickText() ?? ColorInputComponent.defaults.pickText());
    protected readonly hue = computed(() => Math.round(this.hsva().h));
    protected readonly alphaPercent = computed(() => Math.round(this.hsva().a * 100));
    protected readonly saturationPercent = computed(() => Math.round(this.hsva().s * 100));
    protected readonly areaText = computed(() => `Saturation ${String(this.saturationPercent())} %, brightness ${String(Math.round(this.hsva().v * 100))} %`);

    public constructor() {
        super();
        this.isColor.set(true);
        this.label.set({ position: signal<LabelPosition>('right') });
        // [value] flows into the shared state; [text] is guarded so an unbound alias can't clobber [value].
        effect(() => {
            const value = this.valueInput();
            untracked(() => this.valueState.set(value));
        });
        effect(() => {
            const value = this.textInput();
            untracked(() => {
                if (value !== undefined) {
                    this.valueState.set(value);
                }
            });
        });
        // A new value moves the picker, unless it is the colour the picker shows already (keeps the hue of greys)
        effect(() => {
            const color = this.baseColor();
            const hasAlpha = this.alpha();
            untracked(() => {
                if (color && ColorHelper.toHex(color, hasAlpha) !== ColorHelper.toHex(ColorHelper.toRgba(this.hsva()), hasAlpha)) {
                    this.hsva.set(ColorHelper.toHsva(color));
                }
            });
        });
        effect(onCleanup => {
            if (!this.isOpen()) {
                return;
            }
            const close = (event: Event): void => {
                const target = event.target as Node;
                if (!this.popup()?.nativeElement.contains(target) && !this.elementRef.nativeElement.contains(target)) {
                    this.close();
                }
            };
            const place = (): void => this.place();
            document.addEventListener('pointerdown', close, { capture: true });
            window.addEventListener('resize', place);
            window.addEventListener('scroll', place, { capture: true });
            onCleanup(() => {
                document.removeEventListener('pointerdown', close, { capture: true });
                window.removeEventListener('resize', place);
                window.removeEventListener('scroll', place, { capture: true });
            });
        });
        effect(() => {
            if (this.disabled() || this.readonly()) {
                untracked(() => this.close());
            }
        });
    }

    public open(): void {
        if (this.isOpen() || this.disabled() || this.readonly()) {
            return;
        }
        this.isPositioned.set(false);
        this.isOpen.set(true);
        afterNextRender(() => {
            this.place();
            this.popup()?.nativeElement.querySelector<HTMLElement>('.area')?.focus();
        }, { injector: this.injector });
    }

    public close(shouldFocusSwatch = false): void {
        if (!this.isOpen()) {
            return;
        }
        this.isOpen.set(false);
        if (shouldFocusSwatch) {
            this.swatch()?.nativeElement.focus();
        }
    }

    protected toggle(): void {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }

    protected onTextInput(value: string): void {
        this.setValue(value);
    }

    // A readable colour is written back in the picker's own notation, so `red` or `#F00` end up as `#ff0000`
    protected onTextBlur(): void {
        const hex = this.hex();
        if (hex && hex !== this.text()) {
            this.setValue(hex);
        }
    }

    protected pickPreset(preset: ResolvedPreset): void {
        this.setValue(preset.hex);
    }

    protected onAreaPointer(event: PointerEvent): void {
        const element = this.capture(event);
        if (element) {
            const rect = element.getBoundingClientRect();
            this.pick({
                s: this.ratio(event.clientX - rect.left, rect.width),
                v: 1 - this.ratio(event.clientY - rect.top, rect.height)
            });
        }
    }

    protected onHuePointer(event: PointerEvent): void {
        const element = this.capture(event);
        if (element) {
            const rect = element.getBoundingClientRect();
            this.pick({ h: Math.min(359, this.ratio(event.clientX - rect.left, rect.width) * 360) });
        }
    }

    protected onAlphaPointer(event: PointerEvent): void {
        const element = this.capture(event);
        if (element) {
            const rect = element.getBoundingClientRect();
            this.pick({ a: Math.round(this.ratio(event.clientX - rect.left, rect.width) * 100) / 100 });
        }
    }

    protected onAreaKey(event: KeyboardEvent): void {
        const step = event.shiftKey ? 0.1 : 0.01;
        const { s, v } = this.hsva();
        const changes: Record<string, Partial<Hsva>> = {
            ArrowLeft: { s: s - step },
            ArrowRight: { s: s + step },
            ArrowDown: { v: v - step },
            ArrowUp: { v: v + step }
        };
        this.pickByKey(event, changes[event.key]);
    }

    protected onHueKey(event: KeyboardEvent): void {
        const step = event.shiftKey ? 10 : 1;
        const h = this.hsva().h;
        const changes: Record<string, Partial<Hsva>> = {
            ArrowLeft: { h: h - step },
            ArrowDown: { h: h - step },
            ArrowRight: { h: h + step },
            ArrowUp: { h: h + step },
            Home: { h: 0 },
            End: { h: 359 }
        };
        this.pickByKey(event, changes[event.key]);
    }

    protected onAlphaKey(event: KeyboardEvent): void {
        const step = event.shiftKey ? 0.1 : 0.01;
        const a = this.hsva().a;
        const changes: Record<string, Partial<Hsva>> = {
            ArrowLeft: { a: a - step },
            ArrowDown: { a: a - step },
            ArrowRight: { a: a + step },
            ArrowUp: { a: a + step },
            Home: { a: 0 },
            End: { a: 1 }
        };
        this.pickByKey(event, changes[event.key]);
    }

    private pickByKey(event: KeyboardEvent, changes: Partial<Hsva> | undefined): void {
        if (!changes) {
            return;
        }
        event.preventDefault();
        this.pick(changes);
    }

    private pick(changes: Partial<Hsva>): void {
        const next = { ...this.hsva(), ...changes };
        next.h = Math.min(359, Math.max(0, next.h));
        next.s = Math.min(1, Math.max(0, next.s));
        next.v = Math.min(1, Math.max(0, next.v));
        next.a = this.alpha() ? Math.round(Math.min(1, Math.max(0, next.a)) * 100) / 100 : 1;
        this.hsva.set(next);
        this.setValue(ColorHelper.toHex(ColorHelper.toRgba(next), this.alpha()));
    }

    /** Keeps the pointer on the element while it is dragged; undefined for a move without a pressed button */
    private capture(event: PointerEvent): HTMLElement | undefined {
        const element = event.currentTarget as HTMLElement;
        if (event.type === 'pointerdown') {
            try {
                element.setPointerCapture(event.pointerId);
            }
            catch {
                // A pointer that is no longer active (e.g. a synthetic event) can't be captured; the press still picks
            }
            element.focus();
            event.preventDefault();
            return element;
        }
        return element.hasPointerCapture(event.pointerId) ? element : undefined;
    }

    private ratio(offset: number, size: number): number {
        return size > 0 ? Math.min(1, Math.max(0, offset / size)) : 0;
    }

    private parse(value: string | undefined): Rgba | undefined {
        const color = ColorHelper.parse(value);
        return color && !this.alpha() ? { ...color, a: 1 } : color;
    }

    private setValue(value: string | undefined): void {
        this.valueState.set(value);
        this.valueChange.emit(this.value() ?? this.default());
        this.textChange.emit(this.text());
    }

    /** Below the field, aligned to its right edge; above it when there is no room below; always inside the window */
    private place(): void {
        const popup = this.popup()?.nativeElement;
        if (!popup) {
            return;
        }
        const anchor = this.elementRef.nativeElement.getBoundingClientRect();
        const width = popup.offsetWidth;
        const height = popup.offsetHeight;
        const maxRight = document.documentElement.clientWidth - viewportMargin;
        const maxBottom = document.documentElement.clientHeight - viewportMargin;
        let top = anchor.bottom + popupGap;
        if (top + height > maxBottom && anchor.top - popupGap - height >= viewportMargin) {
            top = anchor.top - popupGap - height;
        }
        // Fits neither below nor above: kept inside the window, even if it covers the field then
        top = Math.max(viewportMargin, Math.min(top, maxBottom - height));
        const left = Math.max(viewportMargin, Math.min(anchor.right - width, maxRight - width));
        this.popupLeft.set(left);
        this.popupTop.set(top);
        this.isPositioned.set(true);
    }
}
