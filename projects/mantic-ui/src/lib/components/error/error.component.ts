import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { IgnoredDirective } from '../../directives/ignored.directive';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    standalone: true,
    hostDirectives: [IgnoredDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class ErrorComponent extends InvertibleComponent {
    public constructor() {
        super();
        this.classes.registerFixed('visible', 'error', 'message');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        MessageComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }
}
