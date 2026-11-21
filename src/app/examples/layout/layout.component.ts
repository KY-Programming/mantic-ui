import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { HeaderComponent } from '../../components/header/header.component';
import { InfoComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleComponent, ExampleFrameComponent } from '@mantic-ui/angular-doc';

@Component({
    selector: 'app-layout-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, InfoComponent, ExampleFrameComponent],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./layout.component.scss']
})
export class LayoutExampleComponent {
    protected readonly prefix = inject(FrameworkService).prefix;
}
