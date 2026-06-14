import { Directive, ElementRef, inject, Inject, OnInit, Optional } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';
import { Destroyable } from './destroyable';

@Directive({
    providers: BaseComponent.providers
})
export abstract class BaseComponent extends Destroyable implements OnInit {
    protected static readonly providers = [SortedClassesService];
    protected readonly classes = inject(SortedClassesService, { self: true });
    protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private noClassesValue = false;
    private initialized = false;
    protected readonly tag = this.elementRef.nativeElement.tagName.toLowerCase();
    protected validateAttributes = true;

    protected get noClasses(): boolean {
        return this.noClassesValue;
    }

    protected set noClasses(value: boolean) {
        this.noClassesValue = value;
        this.refreshClasses();
    }

    protected constructor(
        // eslint-disable-next-line @angular-eslint/prefer-inject
        @Optional() @Inject('none') useUiClass = true
    ) {
        super();
        if (useUiClass) {
            this.classes.registerFixed('ui');
        }
        this.classes.register('style');
    }

    public ngOnInit(): void {
        this.initialized = true;
        this.readPropertiesFromAttributes();
        this.refreshClasses();
    }

    private readPropertiesFromAttributes(): void {
        if (!this.validateAttributes) {
            return;
        }
        for (const attribute of this.elementRef.nativeElement.attributes) {
            if (attribute.name.startsWith('_ng') || attribute.name.startsWith('ng-') || attribute.name.startsWith('m-') || attribute.name === 'class' || attribute.name === 'title') {
                continue;
            }
            if (!this.classes.has(attribute.name)) {
                console.warn(`Unknown attribute '${attribute.name}' on <${this.tag}> found.`, this.elementRef.nativeElement);
            }
        }
    }

    // TODO: Check usage
    protected refreshClasses(): void {
        if (!this.initialized) {
            return;
        }
        this.classes.update();
    }

    protected toBoolean(value: BooleanLike): boolean {
        return toBoolean(value);
    }
}
