import { Component, computed, contentChildren, effect, input, output, signal, untracked } from '@angular/core';
import { DataSourceComponent } from '../data-source/data-source.component';
import { FillDirective } from '../flex/fill/fill.directive';
import { FlexDirective } from '../flex/flex.directive';
import { FormElementRendererComponent } from '../form-element-renderer/form-element-renderer.component';
import { FormComponent } from '../form/form.component';
import { FormLayout } from './form-layout';

@Component({
    selector: 'm-form-renderer',
    templateUrl: './form-renderer.component.html',
    styleUrls: ['./form-renderer.component.scss'],
    imports: [FormComponent, FormElementRendererComponent, FlexDirective, FillDirective]
})
export class FormRendererComponent {
    public readonly layout = input<FormLayout>({ elements: [] });
    private readonly dataSourceElements = contentChildren(DataSourceComponent);
    public readonly dataSources = computed(() => [...this.dataSourceElements()]);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly dataInput = input<Record<string, unknown>>({}, { alias: 'data' });
    private readonly dataState = signal<Record<string, unknown>>({});
    public readonly data = this.dataState.asReadonly();
    public readonly dataChange = output<unknown>();
    public readonly execute = output<string>();

    public constructor() {
        effect(() => {
            const value = this.dataInput();
            untracked(() => {
                this.dataState.set(value);
                if (!value) {
                    setTimeout(() => {
                        this.dataState.set({});
                        this.dataChange.emit(this.dataState());
                    });
                }
            });
        });
    }

    protected onExecute(action: string): void {
        this.execute.emit(action);
    }
}
