import { Component, ComponentRef, effect, inject, input, OnDestroy, signal, Type, untracked, ViewContainerRef } from '@angular/core';
import { FormElements } from '../form-renderer/form-layout';
import { FormRendererService } from '../form-renderer/form-renderer.service';
import { FormElementBase } from './form-element-base';

@Component({
    selector: 'm-form-renderer2',
    templateUrl: './form-element-renderer2.component.html',
    styleUrls: ['./form-element-renderer2.component.scss'],
    host: {
        '[class.visible]': 'invalidType()'
    }
})
export class FormElementRenderer2Component implements OnDestroy {
    private readonly formRendererService = inject(FormRendererService);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private elementType: Type<FormElementBase> | undefined;
    public componentRef: ComponentRef<FormElementBase> | undefined;
    public readonly invalidType = signal<string | undefined>(undefined);
    public readonly element = input<FormElements>();
    public readonly data = input<unknown>();

    public constructor() {
        // Resolve the element type and (re)create the child component when the element changes.
        effect(() => {
            const element = this.element();
            untracked(() => {
                this.elementType = this.formRendererService.get(element?.elementType);
                this.invalidType.set(this.elementType ? undefined : element?.elementType);
                this.createComponent();
            });
        });
        // Push data changes onto the already-created child instance.
        effect(() => {
            const data = this.data();
            untracked(() => {
                if (this.componentRef?.instance) {
                    this.componentRef.instance.data = data;
                }
            });
        });
    }

    public createComponent(): void {
        this.viewContainerRef.clear();
        const element = this.element();
        if (!this.elementType || !element) {
            return;
        }
        this.componentRef = this.viewContainerRef.createComponent(this.elementType);
        this.componentRef.instance.element = element;
        this.componentRef.instance.data = this.data();
    }

    public ngOnDestroy(): void {
        this.componentRef?.destroy();
    }
}
