import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManticUiModule } from '@mantic-ui/angular';
import { SemanticUiThemeComponent } from './semantic-ui-theme/semantic-ui-theme.component';
import { SemanticUiSiteComponent } from './semantic-ui-site/semantic-ui-site.component';
import { SemanticUiResetComponent } from './semantic-ui-reset/semantic-ui-reset.component';
import { SemanticUiLatoLocalComponent } from './semantic-ui-lato-local/semantic-ui-lato-local.component';
import { SemanticUiLatoGoogleapiComponent } from './semantic-ui-lato-googleapi/semantic-ui-lato-googleapi.component';
import { SemanticUiIconsLocalComponent } from './semantic-ui-icons-local/semantic-ui-icons-local.component';

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
        CommonModule,
        ManticUiModule,
        ...standalone
    ],
    exports: [
        ManticUiModule,
        ...standalone
    ]
})
export class SemanticUiModule {}
