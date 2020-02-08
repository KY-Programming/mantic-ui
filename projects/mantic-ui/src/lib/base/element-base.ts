import { ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClassList } from '../models/class-list';

export class ElementBase implements OnChanges, OnInit {

    protected readonly classList = new ClassList()
        .registerBoolean('ui')
        .register('class', Number.MAX_VALUE);

    @HostBinding('class')
    public classes: string;

    public ui = true;

    @Input()
    public class: string;

    constructor(
        private readonly element: ElementRef<HTMLElement>
    ) {
    }

    private readPropertiesFromAttributes(): void {
        for (let index = 0; index < this.element.nativeElement.attributes.length; index++) {
            const attribute = this.element.nativeElement.attributes[index];
            if (attribute.name.indexOf('_ng') === 0) {
                continue;
            }
            if (attribute.value !== '') {
                if (attribute.value === 'false') {
                    console.warn(`<${this.element.nativeElement.tagName.toLowerCase()} ${attribute.name}="false"> found. This results that ${attribute.name}-property will be set to true, because false is treaded as string and will be converted to true. Change your code to <${this.element.nativeElement.tagName.toLowerCase()} [${attribute.name}]="false"> to avoid this error.`);
                }
                continue;
            }
            if (!this.classList.contains(attribute.name)) {
                console.warn(`attribute ${attribute.name} on ${this.element.nativeElement.tagName.toLowerCase()} not found`);
                continue;
            }
            this[attribute.name] = true;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const relevantChanges = Object.keys(changes).filter(key => this.classList.contains(key));
        relevantChanges.forEach(key => {
            const value = changes[key].currentValue;
            this.classList.set(key, value);
        });
        if (relevantChanges.length > 0) {
            this.refreshClasses();
        }
    }

    public ngOnInit(): void {
        this.readPropertiesFromAttributes();
        this.refreshClasses();
    }

    protected refreshClasses(): void {
        this.classList.refresh(this);
        this.classes = this.classList.toString();
    }
}
