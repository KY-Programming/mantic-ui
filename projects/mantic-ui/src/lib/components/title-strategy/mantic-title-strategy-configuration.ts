import { ManticTitleStrategyCondition } from './mantic-title-strategy-condition';

export interface ManticTitleStrategyConfiguration {
    prefix?: string;
    postfix?: string;
    fallback?: string;
    showPrefixOnFallback?: boolean;
    showPostfixOnFallback?: boolean;
    conditions?: ManticTitleStrategyCondition[];
}
