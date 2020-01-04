import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/shared/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/shared/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/sidePanel/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'delivery-policy',
    loadChildren: () => import('./pages/sidePanel/delivery-policy/delivery-policy.module').then( m => m.DeliveryPolicyPageModule)
  },
  {
    path: 'cancel',
    loadChildren: () => import('./pages/sidePanel/cancel/cancel.module').then( m => m.CancelPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/sidePanel/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/sidePanel/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/sidePanel/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/sidePanel/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/order/checkout/checkout.module').then( m => m.CheckoutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
