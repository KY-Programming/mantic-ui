import { computed, contentChild, Directive, effect, input, linkedSignal } from '@angular/core';
import { ButtonComponent } from '../components/button/button.component';
import { IconButtonComponent } from '../components/icon-button/icon-button.component';
import { LabelDropdownComponent } from '../components/label-dropdown/label-dropdown.component';
import { LabelComponent } from '../components/label/label.component';
import { LabelOptions } from '../models/label-options';
import { InvertibleComponent } from './invertible.component';

@Directive({
    host: {
        '[class.action]': 'isAction()'
    }
})
export abstract class LabeledBaseComponent extends InvertibleComponent {
    protected static override readonly providers = [...InvertibleComponent.providers];
    private readonly labelQuery = contentChild(LabelComponent);
    public readonly label = linkedSignal<LabelOptions | undefined>(() => this.labelQuery());
    public readonly labelDropdown = contentChild(LabelDropdownComponent);
    protected readonly iconButton = contentChild(IconButtonComponent);
    protected readonly button = contentChild(ButtonComponent);
    public readonly buttonPosition = input<'left' | 'right'>('right');
    public readonly isRight = computed(() => {
        const label = this.label();
        const labelDropdown = this.labelDropdown();
        return !!label && label.position() === 'right' || !!labelDropdown && labelDropdown.position() === 'right';
    });
    public readonly isAction = computed(() => !!this.button() || !!this.iconButton());

    protected constructor() {
        super();
        this.classes.register('labeled');
        effect(() => {
            const label = this.label() ?? this.labelDropdown();
            if (label) {
                this.classes.set('labeled', (label.position() ?? '') + ' labeled');
            }
        });
    }
}
