import { CommonModule } from '@angular/common';
import { Component, ComponentRef, HostBinding, inject, Input, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { FormElements } from '../form-renderer/form-layout';
import { FormRendererService } from '../form-renderer/form-renderer.service';
import { FormElementBase } from './form-element-base';

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
    private readonly formRendererService = inject(FormRendererService);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private elementType: Type<FormElementBase> | undefined;
    private elementValue: FormElements | undefined;
    private dataValue: unknown;

    public componentRef: ComponentRef<FormElementBase> | undefined;

    @HostBinding('class.visible')
    public invalidType: string | undefined;

    public get element(): FormElements | undefined {
        return this.elementValue;
    }

    @Input()
    public set element(value: FormElements | undefined) {
        this.elementValue = value;
        this.elementType = this.formRendererService.get(value?.elementType);
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

    public createComponent(): void {
        this.viewContainerRef.clear();
        if (!this.elementType || !this.element) {
            return;
        }
        this.componentRef = this.viewContainerRef.createComponent(this.elementType);
        this.componentRef.instance.element = this.element;
        this.componentRef.instance.data = this.data;
    }

    public ngOnDestroy(): void {
        this.componentRef?.destroy();
    }
}
