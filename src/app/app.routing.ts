import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessPageComponent } from './components/success-page/success-page.component';

const appRoutes: Routes = [
  { path: 'success', component: SuccessPageComponent, data: {} },
];

export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(appRoutes);
