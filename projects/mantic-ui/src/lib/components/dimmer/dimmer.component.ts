import { Component, effect, input, OnDestroy, signal } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';

@Component({
    selector: 'm-dimmer',
    templateUrl: './dimmer.component.html',
    styleUrls: ['./dimmer.component.scss'],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.page]': 'page()',
        '[class.visible]': 'visible()',
        '[class.active]': 'visible()',
        '(click)': 'onClick()'
    }
})
export class DimmerComponent extends InvertibleComponent implements OnDestroy {
    public static readonly defaults = {
        inverted: signal(false)
    };
    public readonly page = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly hideOnClick = input<boolean, BooleanLike>(false, { transform: toBoolean });
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly visibleInput = input<boolean | undefined, BooleanLike>(undefined, { alias: 'visible', transform: toBoolean });
    private readonly visibleState = signal(true);
    public readonly visible = this.visibleState.asReadonly();

    public constructor() {
        super();
        this.classes.register('page', 'visible')
            .registerFixed('dimmer');
        effect(() => this.refreshInverted(DimmerComponent.defaults.inverted()));
        effect(() => {
            const value = this.visibleInput();
            if (value !== undefined) {
                if (value) {
                    this.show();
                }
                else {
                    this.hide();
                }
            }
        });
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.hide();
    }

    public show(): void {
        this.visibleState.set(true);
        this.refreshClasses();
    }

    public hide(): void {
        this.visibleState.set(false);
        this.refreshClasses();
    }

    protected onClick(): void {
        if (this.hideOnClick()) {
            this.hide();
        }
    }
}
