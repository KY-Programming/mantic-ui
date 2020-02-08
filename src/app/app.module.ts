import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FomanticModule } from './fomantic/fomantic.module';
import { SemanticModule } from './semantic/semantic.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SemanticModule,
    FomanticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
