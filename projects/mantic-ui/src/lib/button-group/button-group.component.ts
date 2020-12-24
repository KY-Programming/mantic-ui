import { Component, ContentChildren, ElementRef, HostBinding, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'm-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent extends BaseComponent {
    private toggleButtonsChangeSubscription: Subscription;
    private toggleButtonSubscriptions: Subscription[];
    private toggleButtonsValue: QueryList<ToggleButtonComponent>;

    public get toggleButtons(): QueryList<ToggleButtonComponent> {
        return this.toggleButtonsValue;
    }

    @ContentChildren(ToggleButtonComponent)
    public set toggleButtons(query: QueryList<ToggleButtonComponent>) {
        this.toggleButtonsChangeSubscription?.unsubscribe();
        this.toggleButtonsChangeSubscription = query.changes.subscribe(() => this.subscribeToggleButtons());
        this.toggleButtonsValue = query;
    }

    @HostBinding('class.buttons')
    public readonly buttons = true;

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
    }

    private subscribeToggleButtons(): void {
        this.toggleButtonSubscriptions?.forEach(subscription => subscription.unsubscribe());
        this.toggleButtonSubscriptions = this.toggleButtonsValue.map(button => button.checkedChange.subscribe(value => value ? this.uncheckOthers(button) : undefined));
    }

    private uncheckOthers(button: ToggleButtonComponent): void {
        this.toggleButtons.filter(x => x !== button).forEach(x => x.checked = false);
    }
}
