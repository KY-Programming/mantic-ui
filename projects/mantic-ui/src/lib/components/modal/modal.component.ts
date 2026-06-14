import { Component, computed, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { FallbackForDirective } from '../../directives/fallback-for.directive';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ButtonComponent } from '../button/button.component';
import { DimmerComponent } from '../dimmer/dimmer.component';
import { IconComponent } from '../icon/icon.component';
import { IconType } from '../icon/models/icon-type';
import { LoaderComponent } from '../loader/loader.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalSize } from './models/modal-size';

@Component({
    selector: 'm-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    imports: [DimmerComponent, ModalHeaderComponent, ModalFooterComponent, IconComponent, ButtonComponent, LoaderComponent, FallbackForDirective],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.hide-dimmer]': 'hideDimmer()'
    }
})
export class ModalComponent extends InvertibleComponent {
    public static readonly defaults = {
        closeIcon: signal<IconType>('close'),
        inverted: signal(false)
    };
    private readonly resizeObserver = new ResizeObserver(() => this.onResize());
    protected minGrowOnlyContentHeight = 0;
    protected readonly defaults = ModalComponent.defaults;
    public readonly growOnly = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly contentElementRef = viewChild<ElementRef<HTMLElement>>('content');
    public readonly basic = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly header = input<string>();
    public readonly showClose = input<boolean, BooleanLike>(false, { transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly showHeaderInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'showHeader', transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly hideHeaderInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'hideHeader', transform: toBoolean });
    public readonly showHeader = computed(() => {
        const hide = this.hideHeaderInput();
        return hide === undefined ? (this.showHeaderInput() ?? true) : !hide;
    });
    public readonly hideHeader = computed(() => !this.showHeader());
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly showFooterInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'showFooter', transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly hideFooterInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'hideFooter', transform: toBoolean });
    public readonly showFooter = computed(() => {
        const hide = this.hideFooterInput();
        return hide === undefined ? (this.showFooterInput() ?? true) : !hide;
    });
    public readonly hideFooter = computed(() => !this.showFooter());
    public readonly hideDimmer = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly visible = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly imageContent = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly fullscreen = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly size = input<ModalSize>();
    public readonly scrolling = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly noPadding = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly loading = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly minContentHeight = input<string>();
    public readonly maxContentHeight = input<string>();
    public readonly closeIcon = input<IconType>();
    // eslint-disable-next-line @angular-eslint/no-output-native
    public readonly close = output();

    public constructor() {
        super(false);
        this.classes.register('basic', 'visible', 'fullscreen', 'size', 'scrolling', 'imageContent', 'header', 'footer', 'showHeader', 'hideHeader', 'showFooter', 'hideFooter', 'hideDimmer', 'showClose', 'minContentHeight', 'maxContentHeight');
        effect(() => this.classes.set('basic', this.basic()));
        effect(() => this.refreshInverted(ModalComponent.defaults.inverted()));

        effect(() => {
            const growOnly = this.growOnly();
            const ref = this.contentElementRef();
            if (!ref) {
                return;
            }
            if (growOnly) {
                this.resizeObserver.observe(ref.nativeElement);
                this.onResize();
            }
            else {
                this.minGrowOnlyContentHeight = 0;
                this.resizeObserver.unobserve(ref.nativeElement);
            }
        });
    }

    protected onClose(): void {
        this.close.emit();
    }

    protected onDimmerClick(event: MouseEvent): void {
        // Only close modal if dimmer was clicked
        if ((event.target as HTMLElement).closest('.modal')) {
            return;
        }
        if (this.showClose()) {
            this.onClose();
        }
    }

    private onResize(): void {
        this.minGrowOnlyContentHeight = Math.max(this.minGrowOnlyContentHeight ?? 0, this.contentElementRef()?.nativeElement.clientHeight ?? 0);
    }
}
