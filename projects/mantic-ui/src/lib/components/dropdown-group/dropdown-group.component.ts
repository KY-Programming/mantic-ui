import { AfterViewInit, Component, inject, input, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { HeaderComponent } from '../header/header.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';

@Component({
    selector: 'm-dropdown-group',
    templateUrl: './dropdown-group.component.html',
    styleUrls: ['./dropdown-group.component.scss'],
    imports: [HeaderComponent, DividerComponent]
})
export class DropdownGroupComponent implements AfterViewInit {
    private readonly viewContainerRef = inject(ViewContainerRef);
    public readonly label = input<string>();
    public readonly icon = input<IconType>();
    public readonly iconSize = input<IconSize>();
    protected readonly contentTemplate = viewChild<TemplateRef<unknown>>('contentTemplate');

    public ngAfterViewInit(): void {
        const contentTemplate = this.contentTemplate();
        if (contentTemplate) {
            this.viewContainerRef.createEmbeddedView(contentTemplate);
        }
        else {
            this.viewContainerRef.clear();
        }
    }

}
