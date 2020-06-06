import { Component, Input, TemplateRef } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @Input()
  public showHamburger = false;

  public get menuTemplates(): TemplateRef<unknown>[] {
    return this.layoutService.menuTemplates;
  }

  public get footerTemplates(): TemplateRef<unknown>[] {
    return this.layoutService.footerTemplates;
  }

  public constructor(
    private readonly layoutService: LayoutService,
  ) {
  }

}
