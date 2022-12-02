import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { ManticTitleStrategyCondition } from './mantic-title-strategy-condition';

@Injectable()
export class ManticTitleStrategy extends TitleStrategy {
    private readonly conditions: ManticTitleStrategyCondition[] = [];

    public prefix?: string;
    public postfix?: string;
    public fallback?: string;
    public showPrefixOnFallback?: boolean;
    public showPostfixOnFallback?: boolean;

    public override updateTitle(snapshot: RouterStateSnapshot): void {
        const condition = this.conditions.find(condition => this.matches(condition, snapshot.url));
        const title = this.buildTitle(snapshot);
        const prefix = condition?.showPrefixOnFallback || this.showPrefixOnFallback || title ? condition?.prefix ?? this.prefix ?? '' : '';
        const postfix = condition?.showPostfixOnFallback || this.showPostfixOnFallback || title ? condition?.postfix ?? this.postfix ?? '' : '';
        document.title = prefix + (title ?? condition?.fallback ?? this.fallback ?? '') + postfix;
    }

    public addCondition(condition: ManticTitleStrategyCondition): void {
        this.conditions.push(condition);
    }

    private matches(condition: ManticTitleStrategyCondition, url: string): boolean {
        if (typeof condition.condition === 'string') {
            return url?.toLowerCase()?.startsWith(condition.condition);
        }
        return !!condition.condition.exec(url);
    }
}

