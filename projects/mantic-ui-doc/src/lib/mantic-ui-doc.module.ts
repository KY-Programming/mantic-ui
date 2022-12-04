import { NgModule } from '@angular/core';
import { ExampleCodeComponent } from './components/example-code/example-code.component';
import { ExampleFrameComponent } from './components/example-frame/example-frame.component';
import { ExampleComponent } from './components/example/example.component';
import { NugetInstallComponent } from './components/nuget-install/nuget-install.component';
import { NugetComponent } from './components/nuget/nuget.component';
import { NpmComponent } from './components/npm/npm.component';
import { NpmInstallComponent } from './components/npm-install/npm-install.component';
import { highlightJsProviders } from './highlightjs.providers';

const standalone = [
    ExampleComponent,
    ExampleCodeComponent,
    ExampleFrameComponent,
    NugetComponent,
    NugetInstallComponent,
    NpmComponent,
    NpmInstallComponent
];

@NgModule({
    imports: [
        ...standalone
    ],
    exports: [
        ...standalone
    ],
    providers: [
        ...highlightJsProviders
    ]
})
export class ManticUiDocModule {}
