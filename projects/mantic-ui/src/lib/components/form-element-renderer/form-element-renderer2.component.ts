import { Component, ComponentRef, HostBinding, Input, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { formElements } from './form-element.decorator';
import { FormElements } from '../form-renderer/form-layout';
import { FormElementBase } from './form-element-base';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-form-renderer2',
    templateUrl: './form-element-renderer2.component.html',
    styleUrls: ['./form-element-renderer2.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class FormElementRenderer2Component implements OnDestroy {
    private elementType: Type<unknown>;
    private elementValue: FormElements;
    private dataValue: unknown;

    public componentRef: ComponentRef<FormElementBase>;

    @HostBinding('class.visible')
    public invalidType: string;

    public get element(): FormElements {
        return this.elementValue;
    }

    @Input()
    public set element(value: FormElements) {
        this.elementValue = value;
        this.elementType = formElements[value?.elementType];
        if (!this.elementType) {
            this.invalidType = value?.elementType;
        }
        this.createComponent();
    }

    public get data(): unknown {
        return this.dataValue;
    }

    @Input()
    public set data(value: unknown) {
        this.dataValue = value;
        if (this.componentRef?.instance) {
            this.componentRef.instance.data = value;
        }
    }

    public constructor(
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    public createComponent(): void {
        this.viewContainerRef.clear();
        if (!this.elementType) {
            return;
        }
        this.componentRef = this.viewContainerRef.createComponent(this.elementType) as ComponentRef<FormElementBase>;
        this.componentRef.instance.element = this.element;
        this.componentRef.instance.data = this.data;
    }

    public ngOnDestroy(): void {
        this.componentRef?.destroy();
    }
}
