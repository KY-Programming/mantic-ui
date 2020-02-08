import { HostBinding, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClassList } from '../models/class-list';

export class ElementBase implements OnChanges, OnInit {

    protected readonly classList = new ClassList().registerFixed('ui').register('class', Number.MAX_VALUE);

    @HostBinding('class')
    public classes: string;

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
        this.refreshClasses();
    }

    protected refreshClasses(): void {
        this.classList.refresh(this);
        this.classes = this.classList.toString();
    }
}
