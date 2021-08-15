import { AuthGuardService } from './services/guards/auth-guard.service';
import { AdminHubComponent } from './main/admin-hub/admin-hub.component';
import { ChoicesHubComponent } from './main/choices-hub/choices-hub.component';
import { CustomerHomeComponent } from './main/customer-home/customer-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '**', redirectTo: '' },
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  // { path: 'customer', component: CustomerHomeComponent },
  { path: 'customer', component: ChoicesHubComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminHubComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
