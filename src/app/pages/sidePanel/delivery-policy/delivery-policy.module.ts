import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryPolicyPageRoutingModule } from './delivery-policy-routing.module';

import { DeliveryPolicyPage } from './delivery-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryPolicyPageRoutingModule
  ],
  declarations: [DeliveryPolicyPage]
})
export class DeliveryPolicyPageModule {}
