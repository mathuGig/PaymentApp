import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { routing } from './app.routing';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, //default route
  { path: 'success', component: SuccessPageComponent, data: {test: 'app.module'} },
];

@NgModule({
  bootstrap: [],
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
})
export class AppModule {}
