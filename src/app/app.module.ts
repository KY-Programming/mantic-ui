import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FomanticModule } from './fomantic/fomantic.module';
import { IntroModule } from './intro/intro.module';
import { SemanticModule } from './semantic/semantic.module';
import { ManticTitleStrategyModule, ManticTitleStrategy } from '@mantic-ui/angular';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        IntroModule,
        SemanticModule,
        FomanticModule,
        ManticTitleStrategyModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    public constructor(
        titleStrategy: ManticTitleStrategy
    ) {
        titleStrategy.postfix = ' - mantic UI';
        titleStrategy.fallback = 'mantic UI'
        titleStrategy.addCondition({ condition: '/semantic', fallback: 'Semantic UI Angular - mantic UI', postfix: ' - Semantic UI Angular - mantic UI'});
        titleStrategy.addCondition({ condition: '/fomantic', fallback: 'Fomantic UI Angular - mantic UI', postfix: ' - Fomantic UI Angular - mantic UI'});
    }

}
