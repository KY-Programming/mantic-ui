import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleStrategy } from '@angular/router';
import { ManticTitleStrategy } from './mantic-title-strategy';

const titleStrategy = new ManticTitleStrategy();

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        { provide: TitleStrategy, useValue: titleStrategy },
        { provide: ManticTitleStrategy, useValue: titleStrategy }
    ]
})
export class ManticTitleStrategyModule {}
