import { Component, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementBase } from '../base/element-base';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
  selector: 'm-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent extends ElementBase {
  private toggleButtonsChangeSubscription: Subscription;
  private toggleButtonSubscriptions: Subscription[];
  private toggleButtonsValue: QueryList<ToggleButtonComponent>;

  @ContentChildren(ToggleButtonComponent)
  public set toggleButtons(query: QueryList<ToggleButtonComponent>) {
    if (this.toggleButtonsChangeSubscription) {
      this.toggleButtonsChangeSubscription.unsubscribe();
    }
    this.toggleButtonsChangeSubscription = query.changes.subscribe(() => this.subscribeToggleButtons());
    this.toggleButtonsValue = query;
  }

  public get toggleButtons(): QueryList<ToggleButtonComponent> {
    return this.toggleButtonsValue;
  }

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerFixed('buttons', Number.MAX_VALUE - 1);
  }

  private subscribeToggleButtons(): void {
    if (this.toggleButtonSubscriptions) {
      this.toggleButtonSubscriptions.forEach(subscription => subscription.unsubscribe());
    }
    this.toggleButtonSubscriptions = this.toggleButtonsValue.map(button => button.checkedChange.subscribe(value => value ? this.uncheckOthers(button) : undefined));
  }

  private uncheckOthers(button: ToggleButtonComponent): void {
    this.toggleButtons.filter(x => x !== button).forEach(x => x.checked = false);
  }
}
