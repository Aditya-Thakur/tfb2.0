import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ProductsPageModule } from '../products/products.module';
import { ProductCardOrderItemComponent } from '../../components/product-card-order-item/product-card-order-item.component';
import { ProductCardOrderItemModule } from 'src/app/components/product-card-order-item/product-card-order-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CartPageRoutingModule,
    ProductsPageModule,
    ProductCardOrderItemModule
  ],
  declarations: [CartPage, ProductCardOrderItemComponent],
  exports: [ProductsPageModule]
})
export class CartPageModule {}
