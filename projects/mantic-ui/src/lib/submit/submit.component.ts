import { Component, ElementRef, HostListener, Optional } from '@angular/core';
import { ButtonBase } from '../base/button-base';
import { FormComponent } from '../form/form.component';
import { Key } from '../models/key';

@Component({
  selector: 'm-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent extends ButtonBase {

  public constructor(
    elementRef: ElementRef<HTMLElement>,
    @Optional() private readonly form: FormComponent
  ) {
    super(elementRef);
  }

  @HostListener('click')
  public onClick(): void {
    this.submit();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.code === Key.space || event.code === Key.enter) {
      this.submit();
      event.preventDefault();
    }
  }

  public submit(): void {
    if (!this.form) {
      return;
    }
    this.form.validateAndSubmit();
  }
}
