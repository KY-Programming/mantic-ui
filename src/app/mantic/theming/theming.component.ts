import { afterRenderEffect, Component, computed, DestroyRef, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ThemeColorName, themeColorNames, ThemeRoleName, themeRoleNames, ThemeTokenService, ThemeTokens, ThemeTokensDirective, toColorProperty, toTokenProperty } from '@mantic-ui/theme';

type NumericToken = 'radius' | 'density' | 'onThreshold' | 'hoverAmount' | 'subtleAmount';

interface NumericControl {
    token: NumericToken;
    label: string;
    min: number;
    max: number;
    step: number;
    unit: string;
}

interface ResolvedValues {
    roles: Partial<Record<ThemeRoleName, string>>;
    colors: Partial<Record<ThemeColorName, string>>;
    numbers: Partial<Record<NumericToken, number>>;
}

@Component({
    selector: 'app-mantic-theming',
    imports: [HeaderComponent, ThemeTokensDirective],
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss']
})
export class ManticThemingComponent {
    private readonly tokenService = inject(ThemeTokenService);
    private readonly preview = viewChild.required<ElementRef<HTMLElement>>('preview');
    private canvasContext?: CanvasRenderingContext2D | null;

    protected readonly roles = themeRoleNames;
    protected readonly colors = themeColorNames;
    protected readonly numericControls: NumericControl[] = [
        { token: 'radius', label: 'Radius', min: 0, max: 1.5, step: 0.05, unit: 'rem' },
        { token: 'density', label: 'Density', min: 0.5, max: 1.5, step: 0.05, unit: '' },
        { token: 'hoverAmount', label: 'Hover shade', min: 0, max: 40, step: 1, unit: '%' },
        { token: 'subtleAmount', label: 'Subtle tint', min: 0, max: 40, step: 1, unit: '%' },
        { token: 'onThreshold', label: 'White/black text threshold', min: 0.3, max: 1, step: 0.01, unit: '' }
    ];

    protected readonly scheme = signal<'light' | 'dark'>('light');
    protected readonly target = signal<'preview' | 'page'>('preview');
    protected readonly tokens = signal<ThemeTokens>({});
    protected readonly previewTokens = computed(() => this.target() === 'preview' ? this.tokens() : {});
    protected readonly code = computed(() => JSON.stringify(this.tokens(), undefined, 4));
    /** Current values as the browser resolves them, to show the defaults in the controls */
    protected readonly resolved = signal<ResolvedValues>({ roles: {}, colors: {}, numbers: {} }, { equal: (a, b) => JSON.stringify(a) === JSON.stringify(b) });

    public constructor() {
        effect(() => {
            if (this.target() === 'page') {
                this.tokenService.apply(this.tokens());
            }
            else {
                this.tokenService.clear();
            }
        });
        inject(DestroyRef).onDestroy(() => this.tokenService.clear());
        afterRenderEffect({
            earlyRead: () => {
                this.tokens();
                this.scheme();
                this.target();
                return this.resolve(this.preview().nativeElement);
            },
            write: values => this.resolved.set(values())
        });
    }

    protected setRole(role: ThemeRoleName, value: string): void {
        this.tokens.update(tokens => ({ ...tokens, [role]: value }));
    }

    protected setColor(color: ThemeColorName, value: string): void {
        this.tokens.update(tokens => ({ ...tokens, colors: { ...tokens.colors, [color]: value } }));
    }

    protected setNumber(control: NumericControl, value: string): void {
        this.tokens.update(tokens => ({ ...tokens, [control.token]: value + control.unit }));
    }

    protected reset(): void {
        this.tokens.set({});
    }

    private resolve(element: HTMLElement): ResolvedValues {
        const style = getComputedStyle(element);
        const values: ResolvedValues = { roles: {}, colors: {}, numbers: {} };
        for (const role of this.roles) {
            values.roles[role] = this.resolveColor(element, toTokenProperty(role));
        }
        for (const color of this.colors) {
            values.colors[color] = this.resolveColor(element, toColorProperty(color));
        }
        for (const control of this.numericControls) {
            // Values carry their unit ('0.2857rem', '8%'), which Number() would reject
            // eslint-disable-next-line unicorn/prefer-number-coercion
            values.numbers[control.token] = Number.parseFloat(style.getPropertyValue(toTokenProperty(control.token)));
        }
        return values;
    }

    /** Resolves a color token (light-dark(), color-mix(), any color space) to #rrggbb for <input type="color"> */
    private resolveColor(element: HTMLElement, property: string): string {
        const probe = document.createElement('span');
        probe.style.color = `var(${property})`;
        element.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        this.canvasContext ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        if (!this.canvasContext) {
            return '#000000';
        }
        this.canvasContext.clearRect(0, 0, 1, 1);
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(0, 0, 1, 1);
        const [r, g, b] = this.canvasContext.getImageData(0, 0, 1, 1).data;
        return '#' + [r, g, b].map(channel => channel.toString(16).padStart(2, '0')).join('');
    }
}
