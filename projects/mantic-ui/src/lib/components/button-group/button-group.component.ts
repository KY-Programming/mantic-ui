import { Component, computed, contentChildren, effect, input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ColorName } from '../../models/color';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
    selector: 'm-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    providers: [...BaseComponent.providers],
    host: {
        '[class.left]': 'attachedLeft()',
        '[class.top]': 'attachedTop()',
        '[class.right]': 'attachedRight()',
        '[class.bottom]': 'attachedBottom()',
        '[class.attached]': 'attached()'
    }
})
export class ButtonGroupComponent extends BaseComponent {
    public readonly attachedLeft = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedTop = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedRight = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachedBottom = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly color = input<ColorName | undefined>(undefined);
    protected readonly toggleButtons = contentChildren(ToggleButtonComponent);
    protected readonly attached = computed(() => this.attachedTop() || this.attachedBottom() || this.attachedLeft() || this.attachedRight());

    public constructor() {
        super();
        this.classes.register('color')
            .registerFixed('buttons');
        effect(() => this.classes.set('color', this.color()));
        effect(onCleanup => {
            const subscriptions = this.toggleButtons().map(button => button.checkedChange.subscribe(value => value ? this.uncheckOthers(button) : this.keepOneChecked()));
            onCleanup(() => {
                for (const subscription of subscriptions) {
                    subscription.unsubscribe();
                }
            });
        });
    }

    private uncheckOthers(button: ToggleButtonComponent): void {
        for (const x of this.toggleButtons().filter(x => x !== button)) {
            x.uncheck();
        }
    }

    private keepOneChecked(): void {
        const buttons = this.toggleButtons();
        if (buttons.length > 0 && buttons.every(button => !button.checked)) {
            buttons[0].check();
        }
    }
}
