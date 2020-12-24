import { Component, ElementRef, HostListener, Optional } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Key } from '../models/key';
import { ButtonBaseComponent } from '../base/button-base.component';

@Component({
  selector: 'm-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent extends ButtonBaseComponent {

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
