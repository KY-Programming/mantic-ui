import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { InputComponent } from '../input/input.component';

export declare type FieldSize = '' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'eleven' | 'twelve' | 'thirteen' | 'fourteen' | 'fifteen' | 'sixteen' | number;

@Component({
  selector: 'm-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent extends ElementBase {
  private readonly fieldSizes: FieldSize[] = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];
  private labelElementValue: HTMLLabelElement;
  private inputComponentValue: InputComponent;
  private nameValue: string;
  private sizeValue: FieldSize;

  @ContentChild(HTMLLabelElement, { static: false })
  public set labelElement(value: HTMLLabelElement) {
    this.labelElementValue = value;
    if (this.labelElementValue) {
      this.labelElementValue.setAttribute('for', this.name);
    }
  }
  public get labelElement(): HTMLLabelElement {
    return this.labelElementValue;
  }

  @ContentChild(InputComponent, { static: false })
  public set inputComponent(value: InputComponent) {
    this.inputComponentValue = value;
    if (this.inputComponentValue) {
      this.inputComponentValue.for = this.name;
    }
  }
  public get inputComponent(): InputComponent {
    return this.inputComponentValue;
  }

  @Input()
  public set name(value: string) {
    this.nameValue = value;
    if (this.labelElement) {
      this.labelElement.setAttribute('for', value);
    }
    if (this.inputComponent) {
      this.inputComponent.for = value;
    }
  }
  public get name(): string {
    return this.nameValue;
  }

  @Input()
  public label: string;

  @Input()
  public set size(value: FieldSize) {
    const sizeNumber = value ? parseInt(value.toString()) : undefined;
    if (sizeNumber && !Number.isNaN(sizeNumber)) {
      this.sizeValue = this.fieldSizes[value];
    } else {
      this.sizeValue = value;
    }
  }
  public get size(): FieldSize {
    return this.sizeValue;
  }

  public constructor(
    readonly elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .register('size')
      .registerAction('size', (entry, value) => entry.isActive = !!value, undefined, 'wide')
      .registerFixed('field', Number.MAX_VALUE - 1);
  }

}
