import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPolicyPage } from './delivery-policy.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPolicyPageRoutingModule {}
