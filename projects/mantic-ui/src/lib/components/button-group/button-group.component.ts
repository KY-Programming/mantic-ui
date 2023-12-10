import { Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from '../../base/base.component';
import { ColorDirective } from '../../directives/color.directive';
import { BooleanLike } from '../../models/boolean-like';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
    selector: 'm-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    standalone: true,
    hostDirectives: [ColorDirective.default],
    providers: [...BaseComponent.providers]
})
export class ButtonGroupComponent extends BaseComponent {
    private toggleButtonsChangeSubscription?: Subscription;
    private toggleButtonSubscriptions?: Subscription[];
    private toggleButtonsValue?: QueryList<ToggleButtonComponent>;
    private isAttachedLeft = false;
    private isAttachedTop = false;
    private isAttachedRight = false;
    private isAttachedBottom = false;

    @Input()
    @HostBinding('class.left')
    public get attachedLeft(): boolean {
        return this.isAttachedLeft;
    }

    public set attachedLeft(value: BooleanLike) {
        this.isAttachedLeft = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.top')
    public get attachedTop(): boolean {
        return this.isAttachedTop;
    }

    public set attachedTop(value: BooleanLike) {
        this.isAttachedTop = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.right')
    public get attachedRight(): boolean {
        return this.isAttachedRight;
    }

    public set attachedRight(value: BooleanLike) {
        this.isAttachedRight = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.bottom')
    public get attachedBottom(): boolean {
        return this.isAttachedBottom;
    }

    public set attachedBottom(value: BooleanLike) {
        this.isAttachedBottom = this.toBoolean(value);
    }

    @HostBinding('class.attached')
    protected get attached(): boolean {
        return this.isAttachedTop || this.attachedBottom || this.attachedLeft || this.attachedRight;
    }

    @ContentChildren(ToggleButtonComponent)
    protected get toggleButtons(): QueryList<ToggleButtonComponent> | undefined {
        return this.toggleButtonsValue;
    }

    protected set toggleButtons(query: QueryList<ToggleButtonComponent> | undefined) {
        this.toggleButtonsChangeSubscription?.unsubscribe();
        this.toggleButtonsChangeSubscription = query?.changes.subscribe(() => this.subscribeToggleButtons());
        this.toggleButtonsValue = query;
        this.subscribeToggleButtons();
    }

    public constructor() {
        super();
        this.classes.registerFixed('buttons');
    }

    private subscribeToggleButtons(): void {
        this.toggleButtonSubscriptions?.forEach(subscription => subscription.unsubscribe());
        this.toggleButtonSubscriptions = this.toggleButtons?.map(button => button.checkedChange.subscribe(value => value ? this.uncheckOthers(button) : this.keepOneChecked()));
    }

    private uncheckOthers(button: ToggleButtonComponent): void {
        this.toggleButtons?.filter(x => x !== button).forEach(x => x.uncheck());
    }

    private keepOneChecked(): void {
        const buttons = Array.from(this.toggleButtons ?? []);
        if (buttons.length > 0 && buttons.every(button => !button.checked)) {
            buttons[0].check();
        }
    }
}
