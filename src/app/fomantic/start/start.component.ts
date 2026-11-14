import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, InfoComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, NpmComponent, NpmInstallComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-fomantic-start',
    imports: [HeaderComponent, HeaderDirective, TabGroupComponent, TabComponent, NpmComponent, NpmInstallComponent, ExampleCodeComponent, InfoComponent],
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class FomanticStartComponent {
    protected readonly appComponentCode = `import { FomanticUiIconsLocalComponent, FomanticUiLatoLocalComponent, FomanticUiResetComponent, FomanticUiSiteComponent, FomanticUiThemeComponent } from '@mantic-ui/fomantic-ui-angular';

@Component({
    selector: 'app-root',
    imports: [FomanticUiThemeComponent, FomanticUiSiteComponent, FomanticUiResetComponent, FomanticUiLatoLocalComponent, FomanticUiIconsLocalComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {}`;

    protected readonly appComponentHtml = `<m-fomantic-ui-theme>
    <!-- Import common styles for site -->
    <m-fomantic-ui-site />
    <!-- Import reset to normalize values for CSS properties -->
    <m-fomantic-ui-reset />
    <!-- Import local hosted lato font -->
    <m-fomantic-ui-lato-local />
    <!-- Import local hosted Fomantic UI icons (not needed when you only use Font Awesome) -->
    <m-fomantic-ui-icons-local />
</m-fomantic-ui-theme>`;

    protected readonly angularJson = ` "projects": {
    "<your-project-name>": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              // Copy all package assets to app asset folder on build
              {
                "glob": "**/*",
                "input": "./node_modules/@mantic-ui/fomantic-ui-angular/assets",
                "output": "/assets/"
              }
            }
          }
        }
      }
    }
  }`;
}
