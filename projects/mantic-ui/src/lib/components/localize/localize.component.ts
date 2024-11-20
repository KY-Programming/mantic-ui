import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, OnInit } from '@angular/core';
import { localizeDictionary } from './localize';

@Component({
    selector: 'm-localize',
    imports: [],
    templateUrl: './localize.component.html',
    styleUrl: './localize.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalizeComponent implements AfterViewInit, OnInit {
    private readonly elementRef = inject(ElementRef);
    public readonly key = input.required<string>();

    public ngOnInit(): void {
        localizeDictionary.set(this.key(), this.elementRef.nativeElement.textContent);
    }

    public ngAfterViewInit(): void {
        localizeDictionary.set(this.key(), this.elementRef.nativeElement.textContent);
    }
}
