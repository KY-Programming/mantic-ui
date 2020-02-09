import { CommonModule } from '@angular/common';
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
    RouterModule,
    SemanticUiModule
  ]
})
export class IntroModule { }
