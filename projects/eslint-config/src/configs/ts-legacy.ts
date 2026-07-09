import type { TSESLint } from '@typescript-eslint/utils';

import tsRecommended from './ts-recommended';

const config: TSESLint.FlatConfig.ConfigArray = [
    ...tsRecommended,
    {
        name: '@mantic-ui/eslint-config/ts-legacy',
        rules: {
            'rxjs-x/no-implicit-any-catch': 'off',
            'unicorn/consistent-class-member-ordering': 'off',
            'unicorn/consistent-class-member-order': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            'unicorn/prefer-global-this': 'off',
        }
    }
];
export default config;