import { Component } from '@angular/core';
import { TabComponent, TabGroupComponent } from '@mantic-ui/angular';
import { ExampleCodeComponent, NpmComponent, NpmInstallComponent } from '@mantic-ui/angular-doc';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-eslint',
    imports: [TabGroupComponent, TabComponent, NpmInstallComponent, ExampleCodeComponent, NpmComponent, HeaderComponent],
    templateUrl: './eslint.component.html',
    styleUrls: ['./eslint.component.scss']
})
export class EslintComponent {
    protected readonly eslintConfigJs = `// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
// Add an import
const manticUi = require("@mantic-ui/eslint-config");

module.exports = tseslint.config(
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            // Add an extend
            ...manticUi.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase",
                },
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case",
                },
            ],
        },
    },
    {
        files: ["**/*.html"],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
            // Add an extend
            ...manticUi.configs.angularRecommended,
        ],
        rules: {},
    }
);
`;

}
