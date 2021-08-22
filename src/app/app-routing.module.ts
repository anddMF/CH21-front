import { LoginPageComponent } from './main/admin-hub/components/login-page/login-page.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AdminHubComponent } from './main/admin-hub/admin-hub.component';
import { ChoicesHubComponent } from './main/choices-hub/choices-hub.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '**', redirectTo: '' },
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  { path: 'customer', component: ChoicesHubComponent},
  { path: 'admin', component: AdminHubComponent, canActivate: [AuthGuardService]  },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
