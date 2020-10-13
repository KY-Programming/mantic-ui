import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-nuget',
  templateUrl: './nuget.component.html',
  styleUrls: ['./nuget.component.scss']
})
export class NugetComponent {

  @Input()
  public package: string;

}
