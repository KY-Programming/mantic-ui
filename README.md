# mantic UI

| [Documentation](https://mantic-ui.ky-programming.de/semantic) | [Github Repository](https://github.com/KY-Programming/mantic-ui) | [Support](https://support.ky-programming.de/) |

Angular components for [Semantic UI](https://semantic-ui.com/) and [Fomantic UI](https://fomantic-ui.com/)

## Repository Info

This is the code for the test and documentation Angular application.

The core Angular components are here: [/projects/mantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/mantic-ui)

The Semantic UI Theme is here: [/projects/semantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/semantic-ui)

The Fomantic UI Theme is here: [/projects/fomantic-ui](https://github.com/KY-Programming/mantic-ui/tree/master/projects/fomantic-ui)

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

### Credits
Original css from [Semantic UI](https://semantic-ui.com/)

## Getting Started with Fomantic UI Theme
The Fomantic UI theme is not yet ready. So it is not published. If you are interested, do not hesitate to write us and we try to get it ready soon! 

### Credits
Original css from [Fomantic UI](https://fomantic-ui.com/)

## Work-in-progress
Currently we are not yet done. So please do not expect a perfect framework

If you have a issue, look in our [issue tracker on github](https://github.com/KY-Programming/mantic-ui/issues)

To support us fork our [github repository](https://github.com/KY-Programming/mantic-ui)

[Direct contact](https://support.ky-programming.de/) (German, English) via [email](https://mail.support.ky-programming.de/), [WhatsApp](https://whatsapp.support.ky-programming.de/) or join our [Discord server](https://discord.mantic-ui.ky-programming.de/)
