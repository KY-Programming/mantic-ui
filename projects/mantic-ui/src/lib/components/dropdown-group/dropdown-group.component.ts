import { AfterViewInit, Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { HeaderComponent } from '../header/header.component';
import { DividerComponent } from '../divider/divider.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-dropdown-group',
    templateUrl: './dropdown-group.component.html',
    styleUrls: ['./dropdown-group.component.scss'],
    imports: [
        CommonModule,
        HeaderComponent,
        DividerComponent
    ]
})
export class DropdownGroupComponent implements AfterViewInit {
    @Input()
    public label: string | undefined;

    @Input()
    public icon: IconType | undefined;

    @Input()
    public iconSize: IconSize;

    @ViewChild('contentTemplate')
    protected contentTemplate: TemplateRef<unknown> | undefined;

    public constructor(
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    public ngAfterViewInit(): void {
        if (this.contentTemplate) {
            this.viewContainerRef.createEmbeddedView(this.contentTemplate);
        } else {
            this.viewContainerRef.clear();
        }
    }

}
