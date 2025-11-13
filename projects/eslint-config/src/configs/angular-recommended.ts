import type { TSESLint } from '@typescript-eslint/utils';
import angular from 'angular-eslint';

const config: TSESLint.FlatConfig.ConfigArray = [
    ...angular.configs.templateRecommended,
    ...angular.configs.templateAccessibility,
    {
        name: '@mantic-ui/eslint-config/angular-recommended',
        rules: {}
    }
];
export default config;