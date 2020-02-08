import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ButtonBase } from '../base/button-base';
import { Color } from '../models/color';

@Component({
  selector: 'm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends ButtonBase {

  @ContentChild('animated', { static: true })
  public animated: TemplateRef<HTMLElement>;

  @Input()
  public animation: 'vertical' | 'fade' | undefined;

  @ContentChild('label', { static: true })
  public label: TemplateRef<HTMLElement>;

  @Input()
  public labelPosition: 'left' | 'right' | undefined;

  @Input()
  public iconOnly: boolean;

  @Input()
  public pointing: 'left' | 'right' | 'top' | 'bottom' | undefined;

  @Input()
  public icon: string;

  @Input()
  public social: string;

  public readonly Color = Color;

  public constructor() {
    super();
    this.classList
      .registerAction('iconOnly', (entry) => entry.isActive = this.iconOnly && !this.label, undefined, 'icon')
      .register('animation')
      .registerBoolean('animated')
      .register('labelPosition')
      .registerBoolean('label', 'labeled')
      .registerBoolean('icon', 'labeled icon')
      .registerAction('social', (entry, value) => entry.classes = value === undefined ? undefined : value.toString().toLowerCase());
  }
}
