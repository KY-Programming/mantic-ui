import { Component } from '@angular/core';

@Component({
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class SemanticStartComponent {
  public code = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">`;

  public appModuleCode = `import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';

@NgModule({
  imports: [
    ...
    SemanticUiModule
  ]
})
export class AppModule { }`;

  public readonly appComponentHtml = `<m-semantic-ui-theme>
    <!-- Import common styles for site -->
    <m-semantic-ui-site></m-semantic-ui-site>
    <!-- Import reset to normalize values for CSS properties -->
    <m-semantic-ui-reset></m-semantic-ui-reset>
    <!-- Import local hosted lato font -->
    <m-semantic-ui-lato-local></m-semantic-ui-lato-local>
    <!-- Import local hosted icons -->
    <m-semantic-ui-icons-local></m-semantic-ui-icons-local>
</m-semantic-ui-theme>`;

  public readonly angularJson = ` "projects": {
    "<your-project-name>": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              // Copy all package assets to app asset folder on build
              {
                "glob": "**/*",
                "input": "./node_modules/@mantic-ui/semantic-ui-angular/assets",
                "output": "/assets/"
              }
            }
          }
        }
      }
    }
  }`;
}
