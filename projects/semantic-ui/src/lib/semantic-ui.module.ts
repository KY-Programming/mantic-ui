import { NgModule } from '@angular/core';
import { ManticUiModule } from '@mantic-ui/angular';
import { SemanticUiIconsLocalComponent } from './semantic-ui-icons-local/semantic-ui-icons-local.component';
import { SemanticUiLatoGoogleapiComponent } from './semantic-ui-lato-googleapi/semantic-ui-lato-googleapi.component';
import { SemanticUiLatoLocalComponent } from './semantic-ui-lato-local/semantic-ui-lato-local.component';
import { SemanticUiResetComponent } from './semantic-ui-reset/semantic-ui-reset.component';
import { SemanticUiSiteComponent } from './semantic-ui-site/semantic-ui-site.component';
import { SemanticUiThemeComponent } from './semantic-ui-theme/semantic-ui-theme.component';

const standalone = [
    SemanticUiThemeComponent,
    SemanticUiSiteComponent,
    SemanticUiResetComponent,
    SemanticUiLatoLocalComponent,
    SemanticUiLatoGoogleapiComponent,
    SemanticUiIconsLocalComponent
];

@NgModule({
    declarations: [],
    imports: [
        ManticUiModule,
        ...standalone
    ],
    exports: [
        ManticUiModule,
        ...standalone
    ]
})
export class SemanticUiModule {}
