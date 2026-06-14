import { Component, computed, effect, input, model, output } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { IconComponent } from '../icon/icon.component';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss'],
    imports: [IconComponent],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.closed]': 'closed()',
        '[class.visible]': 'visible()'
    }
})
export class WarningComponent extends InvertibleComponent {
    protected readonly defaults = MessageComponent.defaults;
    public readonly showClose = input(true);
    public readonly closed = model(false);
    public readonly visible = computed(() => !this.closed());
    public readonly close = output();

    public constructor() {
        super();
        this.classes.registerFixed('warning', 'message');
        effect(() => this.refreshInverted(MessageComponent.defaults.inverted()));
    }

    public onClose(): void {
        this.closed.set(true);
        this.close.emit();
    }
}
