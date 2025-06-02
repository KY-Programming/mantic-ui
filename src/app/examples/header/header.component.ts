
import { Component } from '@angular/core';
import { ButtonGroupComponent, HeaderComponent, HeaderDefaultsComponent, HeaderDirective, IconButtonComponent, IconComponent, InfoComponent, SegmentComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent as AppHeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-header-example',
    imports: [AppHeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, InfoComponent, ButtonGroupComponent, IconButtonComponent, SegmentComponent, HeaderComponent, HeaderDirective],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderExampleComponent {
    public headerCode = `<h1 m-header>First header</h1>
<h2 m-header>Second header</h2>
<h3 m-header>Third header</h3>
<h4 m-header>Fourth header</h4>
<h5 m-header>Fifth header</h5>
<h6 m-header>Sixth header</h6>`;

    public contentCode = `<m-header size="huge">Huge Header</m-header>
<m-header size="large">Large Header</m-header>
<m-header size="medium">Medium Header</m-header>
<m-header size="small">Small Header</m-header>
<m-header size="tiny">Tiny Header</m-header>`;

    public invertedCode = `<h1 m-header inverted>Inverted H1</h1>
<h2 m-header inverted>Inverted H2</h2>
<h3 m-header inverted>Inverted H3</h3>`;

    public fontSize = 16;

    public increase(): void {
        this.fontSize++;
    }

    public decrease(): void {
        this.fontSize--;
    }
}
