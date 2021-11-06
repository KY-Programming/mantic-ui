import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { formElements } from './form-element.decorator';
import { FormElements } from '../form-renderer/form-layout';
import { FormElementBase } from './form-element-base';

@Component({
    selector: 'm-form-renderer2',
    template: `
        <template #container></template>
        <div *ngIf="invalidType">{{invalidType}} is not a known component type</div>
    `
})
export class FormElementRenderer2Component implements OnDestroy {
    private elementType: Type<unknown>;
    private containerValue: ViewContainerRef;
    private elementValue: FormElements;
    private dataValue: unknown;

    public get container(): ViewContainerRef {
        return this.containerValue;
    }

    @ViewChild('container', { read: ViewContainerRef })
    public set container(value: ViewContainerRef) {
        this.containerValue = value;
        this.createComponent();
    }

    public componentRef: ComponentRef<FormElementBase>;
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

    constructor(
        private readonly resolver: ComponentFactoryResolver
    ) {
    }

    public createComponent(): void {
        if (!this.container || !this.elementType) {
            return;
        }
        this.container.clear();
        const factory: ComponentFactory<unknown> = this.resolver.resolveComponentFactory(this.elementType);
        this.componentRef = this.container.createComponent(factory) as ComponentRef<FormElementBase>;
        this.componentRef.instance.element = this.element;
        this.componentRef.instance.data = this.data;
    }

    public ngOnDestroy(): void {
        this.componentRef?.destroy();
    }
}
