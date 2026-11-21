import { Inject, Injectable, InjectionToken } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { ManticTitleStrategyCondition } from './mantic-title-strategy-condition';
import { ManticTitleStrategyConfiguration } from './mantic-title-strategy-configuration';

export const manticTitleStrategyConfigurationToken = new InjectionToken<string>('manticTitleStrategyConfiguration');

@Injectable()
export class ManticTitleStrategy extends TitleStrategy {
    public constructor(
        // eslint-disable-next-line @angular-eslint/prefer-inject -- also created with `new` outside an injection context (provideManticTitleStrategy, ManticTitleStrategyModule)
        @Inject(manticTitleStrategyConfigurationToken) public readonly configuration: ManticTitleStrategyConfiguration = {}
    ) {
        super();
    }

    public override updateTitle(snapshot: RouterStateSnapshot): void {
        const condition = this.configuration.conditions?.find(condition => this.matches(condition, snapshot.url));
        const title = this.buildTitle(snapshot);
        const prefix = title || condition?.showPrefixOnFallback || this.configuration.showPrefixOnFallback ? condition?.prefix ?? this.configuration.prefix ?? '' : '';
        const postfix = title || condition?.showPostfixOnFallback || this.configuration.showPostfixOnFallback ? condition?.postfix ?? this.configuration.postfix ?? '' : '';
        document.title = prefix + (title ?? condition?.fallback ?? this.configuration.fallback ?? '') + postfix;
    }

    public addCondition(condition: ManticTitleStrategyCondition): void {
        this.configuration.conditions ??= [];
        this.configuration.conditions.push(condition);
    }

    private matches(condition: ManticTitleStrategyCondition, url: string): boolean {
        return typeof condition.condition === 'string' ? url.toLowerCase().startsWith(condition.condition) : !!condition.condition.exec(url);
    }
}

