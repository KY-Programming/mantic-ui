import { Component } from '@angular/core';
import { DateInputComponent, DividerComponent, DropdownComponent, DropdownItemComponent, FileInputComponent, FlexComponent, HeaderDirective, IconComponent, InputComponent, InputIconPosition, InputType, LabelComponent, LabelDropdownComponent, NumericInputComponent, SegmentComponent, TabComponent, TabGroupComponent, TextareaComponent, TimeInputComponent, ToggleComponent, WarningComponent } from '@mantic-ui/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ExampleCodeComponent, ExampleComponent } from '@mantic-ui/angular-doc';
import { ValueComponent } from '../../components/value/value.component';

@Component({
    selector: 'app-input-example',
    standalone: true,
    imports: [CommonModule, HeaderComponent, TabGroupComponent, TabComponent, IconComponent, HeaderDirective, ExampleComponent, ExampleCodeComponent, FlexComponent, InputComponent, ValueComponent, TextareaComponent, NumericInputComponent, DateInputComponent, TimeInputComponent, ToggleComponent, DropdownItemComponent, DropdownComponent, DividerComponent, SegmentComponent, FileInputComponent, WarningComponent, LabelComponent, LabelDropdownComponent],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputExampleComponent {
    private focusValue = false;
    private loadingValue = false;
    private disabledValue = false;
    private errorValue = false;

    public inputValue? = 'Default Value';
    public type: InputType = 'text';
    public icon = 'search';
    public iconPosition: InputIconPosition = 'left';
    public selectedTabName?: string;
    public textValue?: string;
    public textareaValue?: string;
    protected stringValue?: string;
    protected stringText = '';
    protected numericValue?: number;
    protected numericNumber = 0;
    protected dateValue?: Date;
    protected dateDate = new Date();
    protected showDayValue = new Date();

    public get focus(): boolean {
        return this.focusValue;
    }

    public set focus(value: boolean) {
        this.reset();
        this.focusValue = value;
    }

    public get loading(): boolean {
        return this.loadingValue;
    }

    public set loading(value: boolean) {
        this.reset();
        this.loadingValue = value;
    }

    public get disabled(): boolean {
        return this.disabledValue;
    }

    public set disabled(value: boolean) {
        this.reset();
        this.disabledValue = value;
    }

    public get error(): boolean {
        return this.errorValue;
    }

    public set error(value: boolean) {
        this.reset();
        this.errorValue = value;
    }

    public fluid = false;

    private reset(): void {
        this.focusValue = false;
        this.loadingValue = false;
        this.disabledValue = false;
        this.errorValue = false;
    }

    public inputMessage?: string;

    public valueChange(event: string | undefined): void {
        this.inputMessage = `Value changed to: ${event}`;
        setTimeout(() => this.inputMessage = undefined, 2000);
    }

    public textCode = `<m-input type="text" placeholder="Search..." [(value)]="value"></m-input>`;
    public textareaCode = `<m-textarea placeholder="Enter a text with line breaks..." [(value)]="value"></m-textarea>`;
    public code2 = `<m-input type="text" placeholder="Search..." [(value)]="inputValue"></m-input>`;
    public code3 = `<m-input [type]="type" placeholder="Search..." [icon]="icon" [iconPosition]="iconPosition" [focused]="focus" [loading]="loading" [disabled]="disabled" [hasError]="error" [fluid]="fluid"></m-input>`;
    public eventCode = `<m-input (valueChange)="valueChange($event)"></m-input>`;
    public numberCode = `<m-numeric-input [(value)]="numericValue"></m-numeric-input>`;
    public dateCode = `<m-date-input [(value)]="dateValue"></m-date-input>`;
    public standardCode = `<m-input>
  <input type="text" placeholder="Search..." maxlength="3">
</m-input>`;

    public readonly maxlengthCode = `<m-input type="text" maxlength="3"/>`;
    protected readonly stringValueCode = `<m-input [(value)]="value"/>`;
    protected readonly stringValueTypeScriptCode = `protected value: string | undefined;`;
    protected readonly stringTextCode = `<m-input [(text)]="value"/>`;
    protected readonly stringTextTypeScriptCode = `protected value: string = '';`;
    protected readonly numericValueCode = `<m-numeric-input [(value)]="value"/>`;
    protected readonly numericValueTypeScriptCode = `protected value: number | undefined;`;
    protected readonly numericNumberCode = `<m-numeric-input [(number)]="value"/>`;
    protected readonly numericNumberTypeScriptCode = `protected value: number = 0;`;
    protected readonly dateValueCode = `<m-date-input [(value)]="value"/>`;
    protected readonly dateValueTypeScriptCode = `protected value: Date | undefined;`;
    protected readonly dateDateCode = `<m-date-input [(date)]="value"/>`;
    protected readonly dateDateTypeScriptCode = `protected value: Date = new Date();`;
    public readonly minCode = `<m-numeric-input [min]="1"/>`;
    public readonly maxCode = `<m-numeric-input [max]="9"/>`;
    public readonly zeroCode = `<m-numeric-input zeroText="Zero"/>`;
    public readonly rangeCode = `<m-numeric-input range [min]="0" [max]="9"/>`;

    public readonly states1 = `<m-input type="text" placeholder="Search..." focused></m-input>`;
    public readonly states2 = `<m-input type="text" placeholder="Search..." icon="search" iconPosition="left" loading></m-input>`;
    public readonly states3 = `<m-input type="text" placeholder="Search..." icon="search" loading></m-input>`;
    public readonly states4 = `<m-input type="text" placeholder="Search..." disabled></m-input>`;
    public readonly states5 = `<m-input type="text" placeholder="Search..." icon="search" disabled></m-input>`;
    public readonly states6 = `<m-input type="text" placeholder="Search..." hasError></m-input>`;

    public readonly variations1 = `<m-input type="text" placeholder="Search..." icon="search"></m-input>`;
    public readonly variations2 = `<m-input type="text" placeholder="Search..." icon="users" iconPosition="left"></m-input>`;
    public readonly variations3 = `<m-input type="text" placeholder="Search..." icon="circular search"></m-input>`;
    public readonly variations4 = `<m-input type="text" placeholder="Search..." icon="inverted circular search"></m-input>`;
    public readonly variations5 = `<m-input type="text" placeholder="mysite.com">
  <m-label>http://</m-label>
</m-input>`;
    public readonly variations6 = `<m-input type="text" placeholder="Find domain">
  <m-label-dropdown position="right" value=".com" [items]="['.com', '.net', '.org']"></m-label-dropdown>
</m-input>`;
    public readonly variations7 = `<m-input type="number" placeholder="Enter weight..">
  <m-label position="right" class="basic">kg</m-label>
</m-input>`;
    public readonly variations8 = `<div class="ui right labeled input">
  <label for="amount" class="ui label">$</label>
  <input type="text" placeholder="Amount" id="amount">
  <div class="ui basic label">.00</div>
</div>`;
    public readonly variations9 = `<m-input icon="tags" iconPosition="left" placeholder="Enter tags">
  <m-label position="right" class="tag">Add Tag</m-label>
</m-input>`;
    public readonly variations10 = `<m-input type="text" class="corner" placeholder="Search...">
  <m-label position="left" class="left corner">
      <m-icon icon="asterisk"></m-icon>
  </m-label>
</m-input>`;
    public readonly file = `<m-file-input (change)="upload($event)">Upload</m-file-input>`;

    public readonly inverted = `<m-input inverted></m-input>`;

    public readonly dateWithDayCode = `<m-date-input showDay></m-date-input>`;

    public getType(value: unknown): string {
        return typeof value;
    }
}
