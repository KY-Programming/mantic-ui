import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/input.component';
import { SliderComponent } from '../slider/slider.component';
import { ToggleComponent } from '../toggle/toggle.component';

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
  private checkboxComponentValue: CheckboxComponent;
  private sliderComponentValue: SliderComponent;
  private toggleComponentValue: ToggleComponent;
  private nameValue: string;
  private labelValue: string;
  private sizeValue: FieldSize;
  private disabledValue: boolean;
  private readonlyValue: boolean;

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
      this.inputComponentValue.readonly = this.readonly;
      this.inputComponentValue.disabled = this.disabled;
    }
  }
  public get inputComponent(): InputComponent {
    return this.inputComponentValue;
  }

  @ContentChild(CheckboxComponent, { static: false })
  public set checkboxComponent(value: CheckboxComponent) {
    this.checkboxComponentValue = value;
    if (this.checkboxComponentValue) {
      this.checkboxComponentValue.label = this.label;
      this.checkboxComponentValue.readonly = this.readonly;
      this.sliderComponentValue.disabled = this.disabled;
    }
  }
  public get checkboxComponent(): CheckboxComponent {
    return this.checkboxComponentValue;
  }

  @ContentChild(SliderComponent, { static: false })
  public set sliderComponent(value: SliderComponent) {
    this.sliderComponentValue = value;
    if (this.sliderComponentValue) {
      this.sliderComponentValue.label = this.label;
      this.sliderComponentValue.readonly = this.readonly;
      this.sliderComponentValue.disabled = this.disabled;
    }
  }
  public get sliderComponent(): SliderComponent {
    return this.sliderComponentValue;
  }

  @ContentChild(ToggleComponent, { static: false })
  public set toggleComponent(value: ToggleComponent) {
    this.toggleComponentValue = value;
    if (this.toggleComponentValue) {
      this.toggleComponentValue.label = this.label;
      this.toggleComponentValue.readonly = this.readonly;
      this.toggleComponentValue.disabled = this.disabled;
    }
  }
  public get toggleComponent(): ToggleComponent {
    return this.toggleComponentValue;
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
  public set label(value: string) {
    this.labelValue = value;
    if (this.checkboxComponent) {
      this.checkboxComponent.label = value;
    }
  }
  public get label(): string {
    return this.labelValue;
  }

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

  @Input()
  public error: boolean;

  @Input()
  public set disabled(value: boolean) {
    this.disabledValue = value;
    if (this.inputComponent) {
      this.inputComponent.disabled = value;
    }
    if (this.checkboxComponent) {
      this.checkboxComponent.disabled = value;
    }
    if (this.toggleComponent) {
      this.toggleComponent.disabled = value;
    }
    if (this.sliderComponent) {
      this.sliderComponent.disabled = value;
    }
  }
  public get disabled(): boolean {
    return this.disabledValue;
  }

  @Input()
  public set readonly(value: boolean) {
    this.readonlyValue = value;
    if (this.inputComponent) {
      this.inputComponent.readonly = value;
    }
    if (this.checkboxComponent) {
      this.checkboxComponent.readonly = value;
    }
    if (this.toggleComponent) {
      this.toggleComponent.readonly = value;
    }
    if (this.sliderComponent) {
      this.sliderComponent.readonly = value;
    }
  }
  public get readonly(): boolean {
    return this.readonlyValue;
  }

  @Input()
  public inline: boolean;

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .register('size')
      .registerAction('size', (entry, value) => entry.isActive = !!value, undefined, 'wide')
      .registerBoolean('error')
      .registerBoolean('disabled')
      .registerBoolean('readonly')
      .registerBoolean('inline')
      .registerFixed('field', Number.MAX_VALUE - 1);
  }

}
