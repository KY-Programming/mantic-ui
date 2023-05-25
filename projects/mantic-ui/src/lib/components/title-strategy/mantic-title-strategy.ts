import { Inject, Injectable, InjectionToken } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { ManticTitleStrategyCondition } from './mantic-title-strategy-condition';
import { ManticTitleStrategyConfiguration } from './mantic-title-strategy-configuration';

export const manticTitleStrategyConfigurationToken = new InjectionToken<string>('manticTitleStrategyConfiguration');

@Injectable()
export class ManticTitleStrategy extends TitleStrategy {
    public constructor(
        @Inject(manticTitleStrategyConfigurationToken) public readonly configuration: ManticTitleStrategyConfiguration = {}
    ) {
        super();
        this.configuration ??= {};
    }

    public override updateTitle(snapshot: RouterStateSnapshot): void {
        const condition = this.configuration.conditions?.find(condition => this.matches(condition, snapshot.url));
        const title = this.buildTitle(snapshot);
        const prefix = condition?.showPrefixOnFallback || this.configuration.showPrefixOnFallback || title ? condition?.prefix ?? this.configuration.prefix ?? '' : '';
        const postfix = condition?.showPostfixOnFallback || this.configuration.showPostfixOnFallback || title ? condition?.postfix ?? this.configuration.postfix ?? '' : '';
        document.title = prefix + (title ?? condition?.fallback ?? this.configuration.fallback ?? '') + postfix;
    }

    public addCondition(condition: ManticTitleStrategyCondition): void {
        this.configuration.conditions ??= [];
        this.configuration.conditions.push(condition);
    }

    private matches(condition: ManticTitleStrategyCondition, url: string): boolean {
        if (typeof condition.condition === 'string') {
            return url?.toLowerCase()?.startsWith(condition.condition);
        }
        return !!condition.condition.exec(url);
    }
}

