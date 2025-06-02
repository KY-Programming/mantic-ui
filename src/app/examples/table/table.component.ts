
import { Component } from '@angular/core';
import { HeaderDirective, IconComponent, TabComponent, TabGroupComponent, TableComponent, WarningComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-table-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, WarningComponent, TableComponent],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableExampleComponent {
    public exampleCode = `<m-table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Job</th>
        </tr>
    </thead>
    <tr>
        <td>James</td>
        <td>24</td>
        <td>Engineer</td>
    </tr>
    <tr>
        <td>Jill</td>
        <td>26</td>
        <td>Engineer</td>
    </tr>
    <tr>
        <td>Elyse</td>
        <td>24</td>
        <td>Designer</td>
    </tr>
</m-table>`;

    public basicCode = `<m-table basic />`;
    public veryBasicCode = `<m-table very basic />`;
    public collapsingCode = `<m-table collapsing />`;

}
