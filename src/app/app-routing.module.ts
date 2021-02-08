import { ChoicesHubComponent } from './main/choices-hub/choices-hub.component';
import { CustomerHomeComponent } from './main/customer-home/customer-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  // { path: 'customer', component: CustomerHomeComponent },
  { path: 'customer', component: ChoicesHubComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
