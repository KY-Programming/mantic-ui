import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './lower-case-url-serializer';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    }
  ],
  imports: [
    CommonModule
  ]
})
export class LowerCaseUrlSerializerModule { }
