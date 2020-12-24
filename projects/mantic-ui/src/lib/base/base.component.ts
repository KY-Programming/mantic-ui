import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { DestroyableComponent } from './destroyable.component';
import { ClassList } from '../models/class-list';

@Component({
    template: ''
})
export class BaseComponent extends DestroyableComponent implements OnInit {
    protected readonly classList = new ClassList();
    // protected readonly eventQueue = new EventQueue();

    @HostBinding('class.ui')
    public ui = true;

    @HostBinding('class')
    public classes = '';

    constructor(
        private readonly element: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.readPropertiesFromAttributes();
    }

    private readPropertiesFromAttributes(): void {
        for (let index = 0; index < this.element.nativeElement.attributes.length; index++) {
            const attribute = this.element.nativeElement.attributes[index];
            if (attribute.name.indexOf('_ng') === 0 || attribute.name.indexOf('m-') === 0) {
                continue;
            }
            const entry = this.classList.find(attribute.name);
            if (!entry) {
                console.warn(`Unknown attribute '${attribute.name}' on <${this.element.nativeElement.tagName.toLowerCase()}> found.`);
            }
        }
    }

    protected refreshClasses(): void {
        this.classes = this.classList.toString();
    }

    protected toBoolean(value: boolean | string): boolean {
        return value === '' || value === true || value?.toString().toLowerCase() === 'true';
    }
}
