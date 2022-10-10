import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  public header: string;

  @Input()
  public subHeader: string;

  @Input()
  public showPlaceholder: boolean;

}
