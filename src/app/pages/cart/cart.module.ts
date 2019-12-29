import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ProductsPageModule } from '../products/products.module';
// import { ProductCardComponent } from '../../components/product-card/product-card.component';

// import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CartPageRoutingModule,
    ProductsPageModule
  ],
  declarations: [CartPage],
  exports: [ProductsPageModule]
})
export class CartPageModule {}
