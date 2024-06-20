import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';

export const routes: Routes = [
  { path: '', component: FormPageComponent },
  {
    path: 'success',
    component: SuccessPageComponent,
    data: { test: 'app-routes.ts' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
