import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent, ColorInputComponent, ColorPreset, DateInputComponent, DividerComponent, DropdownComponent, DropdownItemComponent, FileInputComponent, FlexComponent, IconComponent, InputComponent, InputIconPosition, InputType, LabelComponent, LabelDropdownComponent, NumericInputComponent, SegmentComponent, TabComponent, TabGroupComponent, TextareaComponent, TimeInputComponent, ToggleComponent, WarningComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, ExampleComponent, ExampleDescriptionComponent } from '@mantic-ui/angular-doc';

import { HeaderComponent } from '../../components/header/header.component';
import { ValueComponent } from '../../components/value/value.component';

@Component({
    selector: 'app-input-example',
    imports: [HeaderComponent, TabGroupComponent, TabComponent, ButtonComponent, ColorInputComponent, IconComponent, ExampleComponent, ExampleCodeComponent, FlexComponent, InputComponent, ValueComponent, TextareaComponent, NumericInputComponent, DateInputComponent, TimeInputComponent, ToggleComponent, DropdownItemComponent, DropdownComponent, DividerComponent, SegmentComponent, FileInputComponent, WarningComponent, LabelComponent, LabelDropdownComponent, RouterLink, ExampleDescriptionComponent],
    templateUrl: './input.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
    protected timeValue?: Date;
    protected timeDate = new Date();
    protected showDayValue = new Date();
    protected colorValue?: string;
    protected colorText = '#000000';
    protected colorAlphaValue? = '#2185d080';
    protected colorPresetValue?: string;
    protected colorPlaceholderValue?: string;
    protected readonly colorPresets: ColorPreset[] = ['#000000', '#ffffff', { color: '#db2828', name: 'Alarm' }, { color: '#21ba45', name: 'OK' }];

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

    public textCode = `<m-input type="text" placeholder="Search..." [(value)]="value" />`;
    public textareaCode = `<m-textarea placeholder="Enter a text with line breaks..." [(value)]="value" />`;
    public code2 = `<m-input type="text" placeholder="Search..." [(value)]="inputValue" />`;
    public code3 = `<m-input [type]="type" placeholder="Search..." [icon]="icon" [iconPosition]="iconPosition" [autofocus]="focus" [loading]="loading" [disabled]="disabled" [hasError]="error" [fluid]="fluid" />`;
    public eventCode = `<m-input (valueChange)="valueChange($event)" />`;
    public numberCode = `<m-numeric-input [(value)]="numericValue" />`;
    public dateCode = `<m-date-input [(value)]="dateValue" />`;
    public timeCode = `<m-time-input [(value)]="timeValue" />`;
    public standardCode = `<m-input>
  <input type="text" placeholder="Search..." maxlength="3" #input>
</m-input>`;

    public readonly maxlengthCode = `<m-input type="text" maxlength="3" />`;
    protected readonly stringValueCode = `<m-input [(value)]="value" />`;
    protected readonly stringValueTypeScriptCode = `protected value: string | undefined;`;
    protected readonly stringTextCode = `<m-input [(text)]="value" />`;
    protected readonly stringTextTypeScriptCode = `protected value: string = '';`;
    protected readonly numericValueCode = `<m-numeric-input [(value)]="value" />`;
    protected readonly numericValueTypeScriptCode = `protected value: number | undefined;`;
    protected readonly numericNumberCode = `<m-numeric-input [(number)]="value" />`;
    protected readonly numericNumberTypeScriptCode = `protected value: number = 0;`;
    protected readonly dateValueCode = `<m-date-input [(value)]="value" />`;
    protected readonly dateValueTypeScriptCode = `protected value: Date | undefined;`;
    protected readonly dateDateCode = `<m-date-input [(date)]="value" />`;
    protected readonly dateDateTypeScriptCode = `protected value: Date = new Date();`;
    protected readonly timeValueCode = `<m-time-input [(value)]="value" />`;
    protected readonly timeValueTypeScriptCode = `protected value: Date | number | string | undefined;`;
    protected readonly colorValueCode = `<m-color-input [(value)]="value" />`;
    protected readonly colorAlphaCode = `<m-color-input alpha [(value)]="value" />`;
    protected readonly colorPresetsCode = `<m-color-input [presets]="presets" [(value)]="value" />`;
    protected readonly colorPresetsTypeScriptCode = `protected readonly presets: ColorPreset[] = ['#000000', '#ffffff', { color: '#db2828', name: 'Alarm' }, { color: '#21ba45', name: 'OK' }];`;
    protected readonly colorDefaultsCode = `<!-- once, near the app root: the colors every m-color-input offers -->
<m-color-input-defaults [presets]="themeColors" />`;
    protected readonly colorValueTypeScriptCode = `protected value: string | undefined;`;
    protected readonly colorTextCode = `<m-color-input [(text)]="value" />`;
    protected readonly colorTextTypeScriptCode = `protected value: string = '';`;
    public readonly textPlaceholderCode = `<m-input placeholder="Enter a text..." />`;
    public readonly colorPlaceholderCode = `<m-color-input placeholder="Enter a color..." />`;
    public readonly colorPlaceholderColorCode = `<m-color-input placeholder="#2185d0" [(value)]="value" />`;
    public readonly numericPlaceholderCode = `<m-numeric-input placeholder="Enter a number..." />`;
    public readonly numericPlaceholderNumberCode = `<m-numeric-input placeholder="100" />`;
    public readonly minCode = `<m-numeric-input [min]="1" />`;
    public readonly maxCode = `<m-numeric-input [max]="9" />`;
    public readonly zeroCode = `<m-numeric-input zeroText="Zero" />`;
    public readonly rangeCode = `<m-numeric-input range [min]="0" [max]="9" />`;

    public readonly states2 = `<m-input type="text" placeholder="Search..." icon="search" iconPosition="left" loading />`;
    public readonly states3 = `<m-input type="text" placeholder="Search..." icon="search" loading />`;
    public readonly states4 = `<m-input type="text" placeholder="Search..." disabled />`;
    public readonly states5 = `<m-input type="text" placeholder="Search..." icon="search" disabled />`;
    public readonly states6 = `<m-input type="text" placeholder="Search..." hasError />`;
    public readonly statesReadonly = `<m-input type="text" value="Read only" readonly />`;
    public readonly numericLoadingCode = `<m-numeric-input icon="calculator" iconPosition="left" loading />`;
    public readonly numericDisabledCode = `<m-numeric-input [value]="42" disabled />`;
    public readonly numericErrorCode = `<m-numeric-input [value]="42" hasError />`;
    public readonly numericReadonlyCode = `<m-numeric-input [value]="42" readonly />`;
    public readonly dateLoadingCode = `<m-date-input icon="calendar" iconPosition="left" loading />`;
    public readonly dateDisabledCode = `<m-date-input [value]="value" disabled />`;
    public readonly dateErrorCode = `<m-date-input [value]="value" hasError />`;
    public readonly dateReadonlyCode = `<m-date-input [value]="value" readonly />`;
    public readonly timeLoadingCode = `<m-time-input icon="clock" iconPosition="left" loading />`;
    public readonly timeDisabledCode = `<m-time-input [value]="value" disabled />`;
    public readonly timeErrorCode = `<m-time-input [value]="value" hasError />`;
    public readonly timeReadonlyCode = `<m-time-input [value]="value" readonly />`;
    public readonly colorLoadingCode = `<m-color-input icon="tint" iconPosition="left" loading />`;
    public readonly colorDisabledCode = `<m-color-input value="#2185d0" disabled />`;
    public readonly colorErrorCode = `<m-color-input value="#2185d0" hasError />`;
    public readonly colorReadonlyCode = `<m-color-input value="#2185d0" readonly />`;

    public readonly variations1 = `<m-input type="text" placeholder="Search..." icon="search" />`;
    public readonly variations2 = `<m-input type="text" placeholder="Search..." icon="users" iconPosition="left" />`;
    public readonly variations3 = `<m-input type="text" placeholder="Search..." icon="circular search" />`;
    public readonly variations4 = `<m-input type="text" placeholder="Search..." icon="inverted circular search" />`;
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
      <m-icon icon="asterisk" />
  </m-label>
</m-input>`;
    public readonly file = `<m-file-input (change)="upload($event)">Upload</m-file-input>`;

    public readonly attachedHorizontal = `<m-flex>
  <m-input attachedLeft placeholder="Search..." />
  <m-button attachedRight>Search</m-button>
</m-flex>`;
    public readonly attachedVertical = `<m-flex column>
  <m-input attachedTop placeholder="Comment..." />
  <m-button attachedBottom>Send</m-button>
</m-flex>`;

    public readonly inverted = `<m-input inverted />`;

    public readonly dateWithDayCode = `<m-date-input showDay />`;

    public getType(value: unknown): string {
        return typeof value;
    }
}
