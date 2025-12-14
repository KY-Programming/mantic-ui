import type { TSESLint } from '@typescript-eslint/utils';
import angular from 'angular-eslint';
import * as esImport from 'eslint-plugin-import';
import * as rxjs from 'eslint-plugin-rxjs-updated';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

const config: TSESLint.FlatConfig.ConfigArray = [
    unicorn.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    ...angular.configs.tsRecommended,
    (rxjs as any).configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        }
    },
    {
        name: '@mantic-ui/eslint-config/ts-recommended',
        plugins: {
            rxjs,
            'import': esImport
        },
        rules: {
            // Unicorn
            'unicorn/better-regex': 'warn',
            'unicorn/consistent-destructuring': 'warn',
            'unicorn/custom-error-definition': 'error',
            'unicorn/explicit-length-check': 'off',
            'unicorn/no-nested-ternary': 'off',
            // Has to be disabled because `signal<string | undefined>(undefined)` would not be allowed
            'unicorn/no-useless-undefined': 'off',
            'unicorn/prefer-string-raw': 'off',
            'unicorn/switch-case-braces': 'off',
            // Has to be disabled because `computed(() => ...)` would not be allowed
            'unicorn/consistent-function-scoping': 'off',

            // typescript-eslint
            '@typescript-eslint/no-explicit-any': ['warn', { 'fixToUnknown': true }],
            '@typescript-eslint/prefer-readonly': 'warn',
            '@typescript-eslint/explicit-member-accessibility': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-use-before-define': 'error',
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'import',
                    format: ['camelCase', 'PascalCase']
                },
                {
                    selector: 'classProperty',
                    modifiers: ['protected', 'readonly'],
                    format: ['camelCase', 'PascalCase']
                },
                {
                    selector: 'property',
                    format: [
                        'camelCase',
                        'PascalCase'
                    ],
                    filter: {
                        regex: '^\\[(class|style|attr)(\\..*)?\\]$',
                        match: false
                    }
                },
                {
                    selector: 'property',
                    custom: {
                        regex: '^\\[(class|style|attr)(\\..*)?\\]$',
                        match: true
                    },
                    format: []
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'forbid',
                    trailingUnderscore: 'forbid'
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase']
                },
                {
                    selector: 'default',
                    format: ['camelCase'],
                    leadingUnderscore: 'forbid',
                    trailingUnderscore: 'forbid'
                }
            ],
            '@typescript-eslint/member-ordering': ['warn', {
                'default': [
                    // Index signature
                    'signature',

                    // Fields
                    // "private-static-field",
                    // "protected-static-field",
                    // "public-static-field",
                    //
                    // "private-decorated-field",
                    // "protected-decorated-field",
                    // "public-decorated-field",
                    //
                    // "private-instance-field",
                    // "protected-instance-field",
                    // "public-instance-field",
                    //
                    // "private-abstract-field",
                    // "protected-abstract-field",
                    // "public-abstract-field",
                    //
                    // "private-field",
                    // "protected-field",
                    // "public-field",
                    //
                    'static-field',
                    // "instance-field",
                    // "abstract-field",
                    //
                    // "decorated-field",

                    'field',

                    // Constructors
                    // "public-constructor",
                    // "protected-constructor",
                    // "private-constructor",

                    'constructor',

                    // Methods

                    'method'
                ]
            }],

            // TODO:
            '@angular-eslint/component-class-suffix': 'error',
            '@angular-eslint/component-max-inline-declarations': 'error',
            '@angular-eslint/contextual-decorator': 'error',
            '@angular-eslint/contextual-lifecycle': 'error',
            '@angular-eslint/directive-class-suffix': 'error',
            '@angular-eslint/directive-selector': 'error',
            '@angular-eslint/no-attribute-decorator': 'error',
            '@angular-eslint/no-conflicting-lifecycle': 'error',
            '@angular-eslint/no-empty-lifecycle-method': 'error',
            '@angular-eslint/no-input-prefix': 'warn',
            '@angular-eslint/no-input-rename': 'error',
            '@angular-eslint/no-inputs-metadata-property': 'error',
            '@angular-eslint/no-lifecycle-call': 'error',
            '@angular-eslint/no-output-native': 'warn',
            '@angular-eslint/no-output-on-prefix': 'warn',
            '@angular-eslint/no-output-rename': 'error',
            '@angular-eslint/no-outputs-metadata-property': 'error',
            '@angular-eslint/no-queries-metadata-property': 'error',
            '@angular-eslint/prefer-output-readonly': 'error',
            '@angular-eslint/relative-url-prefix': 'error',
            '@angular-eslint/use-component-selector': 'error',
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/use-pipe-transform-interface': 'error',
            '@angular-eslint/sort-ngmodule-metadata-arrays': 'off',
            'rxjs/no-compat': 'error',
            'rxjs/no-ignored-replay-buffer': 'warn',
            'rxjs/no-nested-subscribe': 'warn',
            'rxjs/no-subject-value': 'warn',
            'rxjs/no-unsafe-takeuntil': 'warn',
            'rxjs/ban-operators': [
                'error',
                {
                    'bufferTime': 'Use buffer(yourObservable.pipe(auditTime(1))) instead'
                }
            ],
            'prefer-const': 'warn',

            'no-cond-assign': 'warn',
            'no-irregular-whitespace': 'warn',
            'no-multiple-empty-lines': 'warn',
            'no-redeclare': 'warn',
            'valid-typeof': 'error',
            'no-restricted-imports': ['error', {
                'patterns': [
                    '*../@*',
                    '*../projects/*'
                ]
            }],
            'max-len': 'off',
            'no-lonely-if': 'warn',
            'no-trailing-spaces': 'off',
            'no-restricted-syntax': ['warn',
                {
                    'selector': 'BinaryExpression[operator=\'in\']',
                    'message': 'Binary expressions with \'in\' operator are not type safe. Use \'ObjectHelper.has()\' instead.'
                }, {
                    'selector': 'VariableDeclarator:matches([id.typeAnnotation=undefined]):matches([init.type=ArrayExpression]):matches([init.elements.length=0])',
                    'message': 'Implicit any arrays are not type safe. Use \'array: MyType[] = []\' instead.'
                }, {
                    'selector': 'PropertyDefinition:matches([typeAnnotation=undefined]):matches([value.type=ArrayExpression]):matches([value.elements.length=0])',
                    'message': 'Implicit any arrays are not type safe. Use \'array: MyType[] = []\' instead.'
                }, {
                    'selector': 'CallExpression[callee.name=merge][arguments.0.type!=SpreadElement]',
                    'message': 'Do not use rxjs merge operator without spread operator. use merge(...myObservables) instead'
                }
            ],
            'consistent-return': 'error'
        }
    }
];
export default config;