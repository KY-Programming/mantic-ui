import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IterableLicenses, Licenses } from 'license-to-json';

@Component({
    selector: 'app-credits',
    templateUrl: './credits.component.html',
    styleUrls: ['./credits.component.scss']
})
export class SemanticCreditsComponent implements OnInit {
    public isLoading = true;
    public licenses: IterableLicenses;

    public constructor(
        private readonly http: HttpClient
    ) {}

    public ngOnInit(): void {
        this.http.get<Licenses>('./assets/3d-party-licenses.json').subscribe(licenses => {
            this.licenses = new IterableLicenses(licenses);
            this.isLoading = false;
        });
    }
}
