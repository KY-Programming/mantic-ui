import type { TSESLint } from '@typescript-eslint/utils';

import tsRecommended from './ts-recommended';

const config: TSESLint.FlatConfig.ConfigArray = [
    ...tsRecommended,
    {
        name: '@mantic-ui/eslint-config/ts-legacy',
        rules: {
            'rxjs/no-implicit-any-catch': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        }
    }
];
export default config;