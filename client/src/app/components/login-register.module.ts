import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { LoginRegisterPageComponent } from './login-register-page/login-register-page.component';

@NgModule({
  declarations: [LoginRegisterPageComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [LoginRegisterPageComponent],
  providers: []
})
export class LoginRegisterModule {}
