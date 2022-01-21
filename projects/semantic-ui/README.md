# mantic UI

| [Documentation](https://mantic-ui.ky-programming.de/semantic) | [Github Repository](https://github.com/KY-Programming/mantic-ui) | [Support](https://support.ky-programming.de/) |

[Semantic UI](https://semantic-ui.com/) theme for [mantic UI](https://www.npmjs.com/package/@mantic-ui/angular) Angular components

Requires [@mantic-ui/angular](https://www.npmjs.com/package/@mantic-ui/angular)

## Example
A common button with some styling

![Example of a common button](https://github.com/KY-Programming/mantic-ui/blob/master/projects/mantic-ui/example.png?raw=true)

````
<m-button primary (click)="...">
  Save
</m-button>
<m-button (click)="...">
  Discard
</m-button>
````

## Getting Started with Semantic UI Theme
Install base package for angular and Semantic UI theme

```
npm i @mantic-ui/angular @mantic-ui/semantic-ui-angular 
```

### Import theme in AppModule
app.module.ts
```
import { SemanticUiModule } from '@mantic-ui/semantic-ui-angular';

@NgModule({
  imports: [
    ...
    SemanticUiModule
  ]
})
export class AppModule { }
```

### Apply style in AppComponent
app.component.html
```
<m-semantic-ui-theme>
    <!-- Import common styles for site -->
    <m-semantic-ui-site></m-semantic-ui-site>
    <!-- Import reset to normalize values for CSS properties -->
    <m-semantic-ui-reset></m-semantic-ui-reset>
    <!-- Import local hosted lato font -->
    <m-semantic-ui-lato-local></m-semantic-ui-lato-local>
</m-semantic-ui-theme>
```
As alternative for <m-semantic-ui-theme>, you can use a CDN
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
```
Or install via [Semantic Docs](https://semantic-ui.com/introduction/getting-started.html)

### Configure package assets usage
angular.json
```
 "projects": {
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
  }
```

## Credits
Original css from [Semantic UI](https://semantic-ui.com/)

## Work-in-progress
Currently we are not yet done. So please do not expect a perfect framework

If you have a issue, look in our [issue tracker on github](https://github.com/KY-Programming/mantic-ui/issues)

To support us fork our [github repository](https://github.com/KY-Programming/mantic-ui)

[Direct contact](https://support.ky-programming.de/) (German, English) via [email](https://mail.support.ky-programming.de/), [WhatsApp](https://whatsapp.support.ky-programming.de/) or join our [Discord server](https://discord.mantic-ui.ky-programming.de/)
