import { Directive, ElementRef, Inject, inject, OnInit, Optional, TypeProvider } from '@angular/core';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';
import { Destroyable } from './destroyable';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive()
export abstract class BaseDirective extends Destroyable implements OnInit {
    protected static readonly providers: TypeProvider[] = [SortedClassesService];
    protected static readonly directives = [];

    protected readonly classes = inject(SortedClassesService, { self: true });
    private noClassesValue = false;
    private initialized = false;
    protected readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef, { self: true });

    protected tag: string;
    protected validateAttributes = true;

    protected get noClasses(): boolean {
        return this.noClassesValue;
    }

    protected set noClasses(value: boolean) {
        this.noClassesValue = value;
        this.refreshClasses();
    }

    protected constructor(
        @Optional() @Inject('none') useUiClass = true
    ) {
        super();
        this.tag = this.elementRef.nativeElement.tagName.toLowerCase();
        if (useUiClass) {
            this.classes?.registerFixed('ui');
        }
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
        for (let index = 0; index < this.elementRef.nativeElement.attributes.length; index++) {
            const attribute = this.elementRef.nativeElement.attributes[index];
            if (attribute.name.indexOf('_ng') === 0 || attribute.name.indexOf('ng-') === 0 || attribute.name.indexOf('m-') === 0 || attribute.name === 'class') {
                continue;
            }
            if (!this.classes.has(attribute.name)) {
                console.warn(`Unknown attribute '${attribute.name}' on <${this.tag}> found.`, this.elementRef.nativeElement);
            }
        }
    }

    protected refreshClasses(): void {
        if (!this.initialized) {
            return;
        }
        this.classes?.update();
    }

    protected toBoolean(value: BooleanLike): boolean {
        return toBoolean(value);
    }

}

