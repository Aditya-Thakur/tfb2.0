import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';

import { DiscountPipe } from '../../pipes/discount.pipe';

import { ProductCardComponent } from '../../components/product-card/product-card.component';

import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    ProductCardModule
  ],
  declarations: [ProductsPage, DiscountPipe, ProductCardComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ProductCardModule
  ]
})
export class ProductsPageModule {}
