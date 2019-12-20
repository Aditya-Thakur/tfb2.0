import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
    ProductCardModule
  ],
  declarations: [ProductDetailsPage],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ProductCardModule
  ]
})
export class ProductDetailsPageModule {}
