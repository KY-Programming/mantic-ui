import { Component, Input } from '@angular/core';
import { DimmableService } from '@mantic-ui/angular';

@Component({
  selector: 'm-nuget-install',
  templateUrl: './nuget-install.component.html',
  styleUrls: ['./nuget-install.component.scss'],
  providers: [DimmableService]
})
export class NugetInstallComponent {

  @Input()
  public package: string;
}
