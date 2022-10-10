import { Component } from '@angular/core';

@Component({
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

    public fontSize = 16;

    public increase(): void {
        this.fontSize++;
    }

    public decrease(): void {
        this.fontSize--;
    }
}
