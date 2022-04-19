import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueComponent } from './value/value.component';

@NgModule({
  declarations: [
    ValueComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValueComponent
  ]
})
export class HelpersModule {}
