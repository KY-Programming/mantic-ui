import {defineConfig} from "eslint/config";
import baseConfig from '../../eslint.config.js';

export default defineConfig(
    ...baseConfig,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: [
                        'm',
                        '-m'
                    ],
                    style: 'kebab-case'
                }
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'm',
                    style: 'kebab-case'
                }
            ]
        }
    }
);
