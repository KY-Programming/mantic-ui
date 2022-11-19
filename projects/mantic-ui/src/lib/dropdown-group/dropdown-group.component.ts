import { AfterViewInit, Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-dropdown-group',
    templateUrl: './dropdown-group.component.html',
    styleUrls: ['./dropdown-group.component.scss']
})
export class DropdownGroupComponent implements AfterViewInit {
    @Input()
    public label: string;

    @Input()
    public icon: IconType;

    @Input()
    public iconSize: IconSize;

    @ViewChild('contentTemplate')
    protected contentTemplate: TemplateRef<unknown>;

    public constructor(
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    public ngAfterViewInit(): void {
        this.viewContainerRef.createEmbeddedView(this.contentTemplate);
    }

}