import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { Key } from '../models/key';

@Component({
  selector: 'm-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends ElementBase {

  @Input()
  public value: boolean;

  @Output()
  public readonly valueChange = new EventEmitter<boolean>();

  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public set checked(value: boolean) {
    this.value = value;
  }
  public get checked(): boolean {
    return this.value;
  }

  @Output()
  public readonly checkedChange = this.valueChange;

  @Input()
  public readonly: boolean;

  @Input()
  public indeterminate: boolean;

  @Input()
  public disabled: boolean;

  @Input()
  public canUncheck = true;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('readonly', 'read-only')
      .registerBoolean('indeterminate')
      .registerBoolean('disabled')
      .registerBoolean('fitted')
      .registerFixed('checkbox')
      .registerBoolean('checked')
      .registerBoolean('value', 'checked');
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    if (event.target instanceof HTMLInputElement || this.readonly || this.disabled) {
      return;
    }
    this.set(!this.value);
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (this.readonly || this.disabled || event.code !== Key.space) {
      return;
    }
    event.preventDefault();
    this.set(!this.value);
  }

  public set(value: boolean): void {
    if (!value && !this.canUncheck) {
      return;
    }
    this.indeterminate = false;
    this.value = value;
    this.onChange();
    this.refreshClasses();
  }

  public onChange(): void {
    this.valueChange.emit(this.value);
  }

  public onInputValueChange(event: Event): void {
    this.set((event.target as HTMLInputElement).checked);
  }

}
