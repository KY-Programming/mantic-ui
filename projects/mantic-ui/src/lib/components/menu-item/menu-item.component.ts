import { Component, EventEmitter, HostBinding, inject, Inject, Input, Optional, Output } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { ActiveDirective } from '../../directives/active.directive';
import { BooleanLike } from '../../models/boolean-like';
import { SortedClassesService } from '../../services/sorted-classes.service';

@Component({
    selector: 'm-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    standalone: true,
    providers: [SortedClassesService],
    hostDirectives: [ActiveDirective.default]
})
export class MenuItemComponent extends BaseComponent {
    protected static override readonly providers = [...BaseComponent.providers];
    protected readonly activeDirective = inject(ActiveDirective, { self: true });
    private isLink = false;

    // TODO: Remove HostBinding
    @HostBinding('class.active')
    public get active(): boolean {
        return this.activeDirective.active;
    }

    protected set active(value: BooleanLike) {
        this.activeDirective.active = value;
    }

    @Input()
    @HostBinding('class.link')
    public get link(): boolean {
        return this.isLink;
    }

    public set link(value: BooleanLike) {
        this.isLink = this.toBoolean(value);
    }

    @Output()
    public readonly activeChange = new EventEmitter<boolean>();

    public constructor(
        @Optional() @Inject('none') useUiClass = true
    ) {
        super(useUiClass);
        this.classes.register('link')
            .registerFixed('item');
    }
}
