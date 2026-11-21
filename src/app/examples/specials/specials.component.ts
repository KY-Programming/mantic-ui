import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { SpecialListExamplesComponent } from '../special-list/special-list.component';

@Component({
    selector: 'app-specials',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, SpecialListExamplesComponent],
    templateUrl: './specials.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./specials.component.scss']
})
export class SpecialExamplesComponent {}
