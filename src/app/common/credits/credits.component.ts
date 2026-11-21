import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IterableLicenses, Licenses } from 'license-to-json';
import { ExpanderComponent, ExpanderHeaderComponent, FlexDirective, LoaderComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-credits',
    imports: [TabGroupComponent, TabComponent, ExpanderComponent, ExpanderHeaderComponent, FlexDirective, LoaderComponent, HeaderComponent],
    templateUrl: './credits.component.html',
    styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {
    private readonly http = inject(HttpClient);

    protected readonly licenses = signal<IterableLicenses | undefined>(undefined);

    public ngOnInit(): void {
        this.http.get<Licenses>('./3d-party-licenses.json').subscribe(licenses => {
            this.licenses.set(new IterableLicenses(licenses));
        });
    }
}
