import { AfterViewInit, Component, TemplateRef, ViewContainerRef, ChangeDetectionStrategy, input, viewChild } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { HeaderComponent } from '../header/header.component';
import { DividerComponent } from '../divider/divider.component';


@Component({
    selector: 'm-dropdown-group',
    templateUrl: './dropdown-group.component.html',
    styleUrls: ['./dropdown-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    HeaderComponent,
    DividerComponent
]
})
export class DropdownGroupComponent implements AfterViewInit {
    public readonly label = input<string>();

    public readonly icon = input<IconType>();

    public readonly iconSize = input<IconSize>();

    protected readonly contentTemplate = viewChild<TemplateRef<unknown>>('contentTemplate');

    public constructor(
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    public ngAfterViewInit(): void {
        const contentTemplate = this.contentTemplate();
        if (contentTemplate) {
            this.viewContainerRef.createEmbeddedView(contentTemplate);
        } else {
            this.viewContainerRef.clear();
        }
    }

}
