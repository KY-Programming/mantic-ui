import { AfterContentInit, AfterViewInit, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DestroyableComponent } from '../base/destroyable.component';
import { ClassList } from '../models/class-list';
import { EventQueue } from '../models/event-queue';

export class ElementBase extends DestroyableComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
    private inited = false;

    protected readonly classList = new ClassList()
        .registerBoolean('ui')
        .register('class', Number.MAX_VALUE);

    protected readonly eventQueue = new EventQueue();

    @HostBinding('class')
    public classes: string;

    public ui = true;

    @Input()
    public class: string;

    constructor(
        private readonly element: ElementRef<HTMLElement>
    ) {
        super();
    }

    private readPropertiesFromAttributes(): void {
        for (let index = 0; index < this.element.nativeElement.attributes.length; index++) {
            const attribute = this.element.nativeElement.attributes[index];
            if (attribute.name.indexOf('_ng') === 0 || attribute.name.indexOf('m-') === 0) {
                continue;
            }
            if (attribute.value !== '') {
                if (attribute.value === 'false') {
                    console.warn(`<${this.element.nativeElement.tagName.toLowerCase()} ${attribute.name}="false"> found. This results that ${attribute.name}-property will be set to true, because false is treaded as string and will be converted to true. Change your code to <${this.element.nativeElement.tagName.toLowerCase()} [${attribute.name}]="false"> to avoid this error.`);
                }
                continue;
            }
            const entry = this.classList.find(attribute.name);
            if (!entry) {
                console.warn(`Unknown attribute '${attribute.name}' on <${this.element.nativeElement.tagName.toLowerCase()}> found.`);
                continue;
            }
            this[entry.key] = true;
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
        this.inited = true;
        this.readPropertiesFromAttributes();
        this.refreshClasses();
    }

    public ngAfterContentInit(): void {
        if (this.inited === false) {
            console.warn(`${this.constructor.name} derive from ElementBase and implements OnInit, but does not calls super.ngOnInit(). Please ensure that all components derived from ElemntBase calls ngOnInit (only if Oninit is implemented)`);
        }
        this.inited = undefined;
    }

    public ngAfterViewInit(): void {
        if (this.inited === false) {
            console.warn(`${this.constructor.name} derive from ElementBase and implements OnInit, but does not calls super.ngOnInit(). Please ensure that all components derived from ElemntBase calls ngOnInit (only if Oninit is implemented)`);
        }
        this.inited = undefined;
    }

    protected refreshClasses(): void {
        this.classList.refresh(this);
        this.classes = this.classList.toString();
    }
}
