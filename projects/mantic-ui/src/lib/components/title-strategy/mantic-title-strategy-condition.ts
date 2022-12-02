export interface ManticTitleStrategyCondition {
    condition: string | RegExp;
    postfix?: string;
    prefix?: string;
    fallback?: string;
    showPrefixOnFallback?: boolean;
    showPostfixOnFallback?: boolean;
}
