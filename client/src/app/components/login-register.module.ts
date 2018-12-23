import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterPageComponent } from './login-register-page/login-register-page.component';
import { SharedModule } from '../modules/shared.module';
@NgModule({
  declarations: [LoginRegisterPageComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginRegisterPageComponent],
  providers: []
})
export class LoginRegisterModule {}
