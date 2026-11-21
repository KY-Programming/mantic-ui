import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { UtilListExamplesComponent } from '../util-list/util-list.component';

@Component({
    selector: 'app-utils',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, UtilListExamplesComponent],
    templateUrl: './utils.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./utils.component.scss']
})
export class UtilExamplesComponent {}
