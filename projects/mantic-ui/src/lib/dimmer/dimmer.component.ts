import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { DimmableService } from '../base/dimmable.component';
import { ElementBase } from '../base/element-base';

// TODO: Enable animation

@Component({
  selector: 'm-dimmer',
  templateUrl: './dimmer.component.html',
  styleUrls: ['./dimmer.component.scss']
})
export class DimmerComponent extends ElementBase implements OnInit, OnDestroy {
  private visibleValue: boolean;

  @Input()
  public page: boolean;

  @Input()
  public useContent = true;

  @Input()
  public hideOnClick = true;

  @Input()
  public set visible(value: boolean) {
    if (value) {
      this.show();
    }
    else {
      this.hide();
    }
  }
  public get visible(): boolean {
    return this.visibleValue;
  }

  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Optional() private readonly dimmableService: DimmableService
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('page')
      .registerBoolean('visible', 'visible active')
      .registerFixed('dimmer', Number.MAX_VALUE - 1);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    if (this.visible === undefined) {
      this.show();
    }
  }

  public show(): void {
    this.visibleValue = true;
    if (this.dimmableService) {
      this.dimmableService.dim();
    }
    this.refreshClasses();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.hide();
  }

  public hide(): void {
    this.visibleValue = false;
    if (this.dimmableService) {
      this.dimmableService.dim(false);
    }
    this.refreshClasses();
  }

  @HostListener('click')
  public onClick(): void {
    if (this.hideOnClick) {
      this.hide();
    }
  }
}
