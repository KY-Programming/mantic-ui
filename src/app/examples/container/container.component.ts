import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-container-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent],
    templateUrl: './container.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./container.component.scss']
})
export class ContainerExampleComponent {}
