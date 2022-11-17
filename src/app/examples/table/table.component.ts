import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-table-example',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableExampleComponent implements OnInit {
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

    constructor() { }

    ngOnInit(): void {
    }

}
