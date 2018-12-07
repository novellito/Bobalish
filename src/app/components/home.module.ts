import { NgModule } from '@angular/core';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [DrinksListComponent, HomeComponent],
  imports: [CommonModule, CurrencyMaskModule, MaterialModule, FormsModule],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule {}
