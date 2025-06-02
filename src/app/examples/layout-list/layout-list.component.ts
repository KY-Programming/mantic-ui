
import { Component, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerComponent, ExpanderComponent, FieldComponent, FillDirective, FlexComponent, FlexDirective, FormComponent, HeaderDirective, IconComponent, InputComponent, MenuComponent, MenuItemComponent, SegmentComponent, SubmitComponent, TabComponent, TabGroupComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-layout-list',
    imports: [RouterLink, SegmentComponent, DividerComponent, ExpanderComponent, FormComponent, HeaderDirective, FlexDirective, FillDirective, FieldComponent, InputComponent, SubmitComponent, MenuComponent, MenuItemComponent, IconComponent, TabGroupComponent, TabComponent, FlexComponent],
    templateUrl: './layout-list.component.html',
    styleUrls: ['./layout-list.component.scss']
})
export class LayoutListExamplesComponent {

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

}
