import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';

import { MyOrdersPage } from './my-orders.page';
import { OrderedItemComponent } from 'src/app/components/ordered-item/ordered-item.component';
import { OrderedItemModule } from 'src/app/components/ordered-item/ordered-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrdersPageRoutingModule,
    OrderedItemModule
  ],
  declarations: [MyOrdersPage, OrderedItemComponent],
  exports: [OrderedItemComponent, OrderedItemModule]
})
export class MyOrdersPageModule {}
