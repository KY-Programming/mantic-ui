
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderDirective, IconComponent, SegmentComponent, TabComponent, TabGroupComponent, TableComponent, WarningComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-table-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ExampleComponent, ExampleCodeComponent, WarningComponent, TableComponent, IconComponent, SegmentComponent],
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
    public scrollableCode = `<m-table unstackable scrollable stickyLastColumn>
    <thead>
        <tr>
            <th>Name</th>
            ...
            <th></th>
        </tr>
    </thead>
    <tr>
        <td>James</td>
        ...
        <td class="collapsing"><m-icon icon="ellipsis horizontal" /></td>
    </tr>
</m-table>`;
    public scrollableVeryBasicCode = `<m-table unstackable scrollable very basic inverted />`;
    public readonly people = [
        { name: 'James', age: 24, job: 'Engineer', status: 'Approved', city: 'New York', notes: 'None' },
        { name: 'Jill', age: 26, job: 'Engineer', status: 'Denied', city: 'Chicago', notes: 'Requires call' },
        { name: 'Elyse', age: 24, job: 'Designer', status: 'Approved', city: 'San Francisco', notes: 'None' }
    ];

}
