import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FomanticModule } from './fomantic/fomantic.module';
import { IntroModule } from './intro/intro.module';
import { SemanticModule } from './semantic/semantic.module';
import { HeaderComponent } from './helpers/header/header.component';

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
        FomanticModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
