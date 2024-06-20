import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessPageComponent } from './components/success-page/success-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, //default route
  {
    path: 'success',
    component: SuccessPageComponent,
    data: { test: 'app-routing' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
