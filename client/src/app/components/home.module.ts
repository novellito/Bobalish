import { NgModule } from '@angular/core';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../modules/shared.module';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [DrinksListComponent, HomeComponent],
  imports: [CommonModule, CurrencyMaskModule, SharedModule],
  exports: [HomeComponent],
  providers: [AuthGuard]
})
export class HomeModule {}
