import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IterableLicenses, Licenses } from 'license-to-json';
import { CommonModule } from '@angular/common';
import { ExpanderComponent, ExpanderHeaderComponent, FlexDirective, HeaderDirective, LoaderComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-credits',
    standalone: true,
    imports: [CommonModule, TabGroupComponent, TabComponent, ExpanderComponent, ExpanderHeaderComponent, FlexDirective, HeaderDirective, LoaderComponent, HeaderComponent],
    templateUrl: './credits.component.html',
    styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {
    public isLoading = true;
    public licenses?: IterableLicenses;

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
