import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { InvertibleComponent } from '../../base/invertible.component';
import { IgnoredDirective } from '../../directives/ignored.directive';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'm-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
    hostDirectives: [IgnoredDirective.default],
    providers: [...InvertibleComponent.providers]
})
export class InfoComponent extends InvertibleComponent implements OnInit {
    public constructor() {
        super();
        this.classes.registerFixed('visible', 'info', 'message');
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        MessageComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }
}
