import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FomanticButtonComponent } from './fomantic/button/button.component';
import { FomanticDividerComponent } from './fomantic/divider/divider.component';
import { FomanticInputComponent } from './fomantic/input/input.component';
import { FomanticLayoutComponent } from './fomantic/layout/layout.component';
import { FomanticStartComponent } from './fomantic/start/start.component';
import { SemanticButtonComponent } from './semantic/button/button.component';
import { SemanticDividerComponent } from './semantic/divider/divider.component';
import { SemanticDropdownComponent } from './semantic/dropdown/dropdown.component';
import { SemanticInputComponent } from './semantic/input/input.component';
import { SemanticLayoutComponent } from './semantic/layout/layout.component';
import { SemanticStartComponent } from './semantic/start/start.component';

const routes: Routes = [
  { path: '', redirectTo: 'semantic', pathMatch: 'full' },
  {
    path: 'semantic', component: SemanticLayoutComponent, children: [
      { path: '', component: SemanticStartComponent },
      { path: 'button', component: SemanticButtonComponent },
      { path: 'divider', component: SemanticDividerComponent },
      { path: 'input', component: SemanticInputComponent },
      { path: 'dropdown', component: SemanticDropdownComponent }
    ]
  },
  {
    path: 'fomantic', component: FomanticLayoutComponent, children: [
      { path: '', component: FomanticStartComponent },
      { path: 'button', component: FomanticButtonComponent },
      { path: 'divider', component: FomanticDividerComponent },
      { path: 'input', component: FomanticInputComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
