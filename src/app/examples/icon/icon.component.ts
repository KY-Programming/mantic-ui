import { Component } from '@angular/core';
import { faRocket } from '@fortawesome/pro-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent, TableComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-icon-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, FontAwesomeModule, TableComponent],
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconExampleComponent {
    public readonly faRocket = faRocket;

    public readonly mIconCode = `<m-icon icon="rocket"></m-icon>`;
    public readonly faIconHtml = `<fa-icon [icon]="faRocket"></fa-icon>`;
    public readonly faIconCode = `import { faRocket } from '@fortawesome/pro-solid-svg-icons';
@Component({...})
export class MyComponent {
    public readonly faRocket = faRocket;
}`;
}
