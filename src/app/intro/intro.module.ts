import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SemanticUiModule } from 'projects/semantic-ui/src/public-api';
import { IntroComponent } from './intro.component';

@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SemanticUiModule
  ]
})
export class IntroModule { }
