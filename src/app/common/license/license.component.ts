import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderDirective, IconComponent, InfoComponent, TabComponent, TabGroupComponent, TableComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, NpmComponent, NpmInstallComponent } from '@mantic-ui/angular-doc';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-license',
    imports: [CommonModule, TabGroupComponent, TabComponent, HeaderDirective, NpmInstallComponent, ExampleCodeComponent, NpmComponent, InfoComponent, TableComponent, RouterLink],
    templateUrl: './license.component.html',
    styleUrls: ['./license.component.scss']
})
export class LicenseComponent {
    public readonly angular = `{
  ...
  "scripts": {
    ...
    "prebuild": "license-to-json -auth-token=...",
  }`;

    public readonly output = `{
  "@angular/common": [
    {
      "type": "MIT",
      "text": "The MIT License\n\nCopyright (c) 2010-2022 Google LLC. https://angular.io/license\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n",
      "textSource": "GIT repository"
    }
  ],
  ...
  "tslib": [
    {
      "type": "0BSD",
      "text": "Copyright (c) Microsoft Corporation.\r\n\r\nPermission to use, copy, modify, and/or distribute this software for any\r\npurpose with or without fee is hereby granted.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\r\nREGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\r\nAND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\r\nINDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\r\nLOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\r\nOTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\r\nPERFORMANCE OF THIS SOFTWARE.",
      "textSource": "NPM package"
    }
  ]
}`;
    public readonly angularComponent = `import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IterableLicenses, Licenses } from 'license-to-json';

@Component({
    selector: 'app-credits',
    template: \`
		<m-expander *ngFor="let entry of licenses">
			<m-expander-header>
				{{entry.name}}
			</m-expander-header>
			<div *ngFor="let license of entry.licenses">
				<pre>{{license.text}}</pre>
			</div>
		</m-expander>
    \`,
    styles: []
})
export class CreditsComponent {
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
`;

}
