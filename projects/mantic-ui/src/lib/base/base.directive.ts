import { Directive, ElementRef, Inject, inject, OnInit, Optional, TypeProvider } from '@angular/core';
import { toBoolean } from '../helpers/to-boolean';
import { BooleanLike } from '../models/boolean-like';
import { SortedClassesService } from '../services/sorted-classes.service';
import { Destroyable } from './destroyable';

@Directive()
export abstract class BaseDirective extends Destroyable implements OnInit {
    protected static readonly providers: TypeProvider[] = [SortedClassesService];
    protected readonly classes = inject(SortedClassesService, { self: true });
    protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef, { self: true });
    private noClassesValue = false;
    private initialized = false;
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
        // eslint-disable-next-line @angular-eslint/prefer-inject
        @Optional() @Inject('none') useUiClass = true
    ) {
        super();
        this.tag = this.elementRef.nativeElement.tagName.toLowerCase();
        if (useUiClass) {
            this.classes.registerFixed('ui');
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
        for (const attribute of this.elementRef.nativeElement.attributes) {
            if (attribute.name.startsWith('_ng') || attribute.name.startsWith('ng-') || attribute.name.startsWith('m-') || attribute.name === 'class' || attribute.name === 'title') {
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
        this.classes.update();
    }

    protected toBoolean(value: BooleanLike): boolean {
        return toBoolean(value);
    }

}

