import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDirective } from '../../../../projects/mantic-ui/src/lib/directives/header.directive';
import { RouterLink } from '@angular/router';
import { ButtonComponent, CheckboxComponent, DropdownComponent, DropdownItemComponent, ErrorComponent, FillDirective, FlexDirective, InfoComponent, InputComponent, MessageComponent, RadioComponent, SegmentComponent, SliderComponent, ToggleComponent, WarningComponent } from '@mantic-ui/angular';

@Component({
    selector: 'app-element-list',
    standalone: true,
    imports: [CommonModule, RouterLink, SegmentComponent, ButtonComponent, CheckboxComponent, DropdownComponent, DropdownItemComponent, InputComponent, InfoComponent, WarningComponent, ErrorComponent, MessageComponent, RadioComponent, SliderComponent, ToggleComponent, HeaderDirective, FillDirective, FlexDirective],
    templateUrl: './element-list.component.html',
    styleUrls: ['./element-list.component.scss']
})
export class ElementListExamplesComponent {

    @HostBinding('class.component-grid')
    public readonly host = true;

    public prevent(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

}
