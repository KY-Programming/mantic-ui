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

  public styleScssCode = `@import '@mantic-ui/semantic-ui-angular/assets/all.css';`;

  public angularJsonCode = `{
"projects": {
  "angular8": {
    "architect": {
      "build": {
        "options": {
          ...
          "styles": [
            "node_modules/@mantic-ui/semantic-ui-angular/assets/all.css",
            "src/styles.scss"
          ],
          "scripts": []
        }
  ...`;
}
