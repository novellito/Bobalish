import { NgModule } from '@angular/core';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [DrinksListComponent, HomeComponent],
  imports: [CommonModule, CurrencyMaskModule, SharedModule],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule {}
