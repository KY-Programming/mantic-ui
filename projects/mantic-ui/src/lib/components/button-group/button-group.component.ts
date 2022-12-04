import { Component, ContentChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'm-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss'],
    standalone: true,
    hostDirectives: [...BaseComponent.directives],
    providers: [...BaseComponent.providers]
})
export class ButtonGroupComponent extends BaseComponent {
    private toggleButtonsChangeSubscription: Subscription;
    private toggleButtonSubscriptions: Subscription[];
    private toggleButtonsValue: QueryList<ToggleButtonComponent>;

    @ContentChildren(ToggleButtonComponent)
    protected get toggleButtons(): QueryList<ToggleButtonComponent> {
        return this.toggleButtonsValue;
    }

    protected set toggleButtons(query: QueryList<ToggleButtonComponent>) {
        this.toggleButtonsChangeSubscription?.unsubscribe();
        this.toggleButtonsChangeSubscription = query.changes.subscribe(() => this.subscribeToggleButtons());
        this.toggleButtonsValue = query;
        this.subscribeToggleButtons();
    }

    public constructor() {
        super();
        this.classes.registerFixed('buttons');
    }

    private subscribeToggleButtons(): void {
        this.toggleButtonSubscriptions?.forEach(subscription => subscription.unsubscribe());
        this.toggleButtonSubscriptions = this.toggleButtons.map(button => button.checkedChange.subscribe(value => value ? this.uncheckOthers(button) : this.keepOneChecked()));
    }

    private uncheckOthers(button: ToggleButtonComponent): void {
        this.toggleButtons.filter(x => x !== button).forEach(x => x.uncheck());
    }

    private keepOneChecked(): void {
        const buttons = Array.from(this.toggleButtons);
        if (buttons.length > 0 && buttons.every(button => !button.checked)) {
            buttons[0].check();
        }
    }
}
