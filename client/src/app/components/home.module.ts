import { NgModule } from '@angular/core';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from '../modules/shared.module';
import { AuthGuard } from './services/auth-guard.service';
import { RecommendationsComponent } from './recommendations/recommendations.component';

@NgModule({
  declarations: [DrinksListComponent, HomeComponent, RecommendationsComponent],
  imports: [CommonModule, CurrencyMaskModule, SharedModule],
  exports: [HomeComponent],
  providers: [AuthGuard]
})
export class HomeModule {}
