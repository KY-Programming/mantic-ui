import { Component, OnInit } from '@angular/core';
import { faRocket } from '@fortawesome/pro-solid-svg-icons';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class SemanticIconComponent {
    public readonly faRocket = faRocket;
    
    public readonly mIconCode = `<m-icon icon="rocket"></m-icon>`;
    public readonly faIconHtml = `<fa-icon [icon]="faRocket"></fa-icon>`;
    public readonly faIconCode = `import { faRocket } from '@fortawesome/pro-solid-svg-icons';
@Component({...})
export class MyComponent {
    public readonly faRocket = faRocket;
}`;
}
