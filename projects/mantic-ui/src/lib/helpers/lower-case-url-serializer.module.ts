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
    imports: []
})
export class LowerCaseUrlSerializerModule {}
