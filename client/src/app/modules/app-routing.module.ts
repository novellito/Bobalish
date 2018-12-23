import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginRegisterPageComponent } from '../components/login-register-page/login-register-page.component';
import { AuthGuard } from '../components/services/auth-guard.service';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'login',
    component: LoginRegisterPageComponent
  },
  {
    path: 'register',
    component: LoginRegisterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
