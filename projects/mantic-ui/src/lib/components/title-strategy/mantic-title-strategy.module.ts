import { NgModule } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ManticTitleStrategy } from './mantic-title-strategy';

const titleStrategy = new ManticTitleStrategy();

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        { provide: TitleStrategy, useValue: titleStrategy },
        { provide: ManticTitleStrategy, useValue: titleStrategy }
    ]
})
export class ManticTitleStrategyModule {}
