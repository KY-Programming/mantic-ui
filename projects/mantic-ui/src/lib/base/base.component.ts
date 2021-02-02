import { AfterViewInit, Component, ElementRef, HostBinding, Inject, OnInit, Optional } from '@angular/core';
import { DestroyableComponent } from './destroyable.component';
import { ClassList } from '../models/class-list';

@Component({
    template: ''
})
export class BaseComponent extends DestroyableComponent implements OnInit {
    protected tag: string;
    protected noClasses = false;
    protected readonly classList: ClassList;
    // protected readonly eventQueue = new EventQueue();

    @HostBinding('class')
    public classes = '';

    public constructor(
        private readonly element: ElementRef<HTMLElement>,
        @Inject('none') useUiClass = true
    ) {
        super();
        this.tag = this.element.nativeElement.tagName.toLowerCase();
        this.classList = new ClassList(this.tag);
        if (useUiClass) {
            this.classList.register('ui');
            this.classList.set('ui', true);
        }
        this.refreshClasses();
    }

    public ngOnInit(): void {
        this.readPropertiesFromAttributes();
    }

    private readPropertiesFromAttributes(): void {
        for (let index = 0; index < this.element.nativeElement.attributes.length; index++) {
            const attribute = this.element.nativeElement.attributes[index];
            if (attribute.name.indexOf('_ng') === 0 || attribute.name.indexOf('ng-') === 0 || attribute.name.indexOf('m-') === 0 || attribute.name == 'class') {
                continue;
            }
            if (!this.classList.has(attribute.name)) {
                console.warn(`Unknown attribute '${attribute.name}' on <${this.tag}> found.`);
            }
        }
    }

    // TODO: Check usage
    protected refreshClasses(): void {
        this.classes = this.noClasses ? '' : this.classList.toString();
    }

    protected toBoolean(value: boolean | string): boolean {
        return value === '' || value === true || value?.toString().toLowerCase() === 'true';
    }
}
