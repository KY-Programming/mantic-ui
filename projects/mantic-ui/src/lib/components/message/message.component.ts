import { Component, effect, input, output, signal } from '@angular/core';
import { InvertibleComponent } from '../../base/invertible.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { LoaderComponent } from '../loader/loader.component';
import { MessageAttached } from './models/message-attached';

@Component({
    selector: 'm-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    imports: [
        IconComponent,
        LoaderComponent
    ],
    providers: [...InvertibleComponent.providers],
    host: {
        '[class.positive]': 'positive()',
        '[class.info]': 'info()',
        '[class.success]': 'success()',
        '[class.warning]': 'warning()',
        '[class.error]': 'error()',
        '(click)': 'onClick($event)'
    }
})
export class MessageComponent extends InvertibleComponent {
    public static readonly defaults = {
        closeIcon: signal<IconType>('close'),
        closeIconSize: signal<IconSize>(undefined),
        inverted: signal(false)
    };
    protected readonly defaults = MessageComponent.defaults;
    public readonly positive = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly info = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly success = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly warning = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly error = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly closable = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly showClose = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly loading = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attached = input<MessageAttached>();
    public readonly header = input<string>();
    public readonly icon = input<IconType | undefined>();
    public readonly iconSize = input<IconSize>();
    public readonly closeIcon = input<IconType>();
    public readonly closeIconSize = input<IconSize>();
    public readonly ignored = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly close = output<MouseEvent>();

    public constructor() {
        super();
        this.classes.register('ignored', 'positive', 'success', 'warning', 'error', 'attached', 'icon', 'closable')
            .registerFixed('visible', 'message');
        effect(() => this.classes.set('ignored', this.ignored()));
        effect(() => this.classes.set('icon', this.loading() || !!this.icon()));
        effect(() => this.classes.set('attached', this.attached() ? (this.attached() ?? '') + ' attached' : undefined));
        effect(() => this.refreshInverted(MessageComponent.defaults.inverted()));
    }

    protected onClick(event: MouseEvent): void {
        const selection = globalThis.getSelection();
        if (selection && this.elementRef.nativeElement.contains(selection.focusNode) && (selection.anchorNode !== selection.focusNode || selection.anchorOffset !== selection.focusOffset)) {
            return;
        }
        if (this.closable()) {
            this.close.emit(event);
        }
    }
}
