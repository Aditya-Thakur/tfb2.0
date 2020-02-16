import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () => import('./../cart/cart.module').then(m => m.CartPageModule)
          }
        ]
      },
      {
        path: 'Categories',
        children: [
          {
            path: '',
            loadChildren: () => import('./../categories/categories.module').then(m => m.CategoriesPageModule)
          }
        ]
      },
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () => import('./../main/main.module').then(m => m.MainPageModule)
          }
        ]
      },
      {
        path: 'details',
        children: [
          {
            path: '',
            loadChildren: () => import('./../product-details/product-details.module').then(m => m.ProductDetailsPageModule)
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadChildren: () => import('./../products/products.module').then(m => m.ProductsPageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () => import('./../search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: () => import('../shared/register/register.module').then(m => m.RegisterPageModule)
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('../shared/login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'update-password',
        children: [
          {
            path: '',
            loadChildren: () => import('../shared/update-password/update-password.module').then(m => m.UpdatePasswordPageModule)
          }
        ]
      },
      {
        path: 'aboutUs',
        children: [
          {
            path: '',
            loadChildren: () => import('../sidePanel/about-us/about-us.module').then(m => m.AboutUsPageModule)
          }
        ]
      },
      {
        path: 'contactUs',
        children: [
          {
            path: '',
            loadChildren: () => import('../sidePanel/contact-us/contact-us.module').then(m => m.ContactUsPageModule)
          }
        ]
      },
      {
        path: 'cancel',
        children: [
          {
            path: '',
            loadChildren: () => import('../sidePanel/cancel/cancel.module').then(m => m.CancelPageModule)
          }
        ]
      },
      {
        path: 'deliveryPolicy',
        children: [
          {
            path: '',
            loadChildren: () => import('../sidePanel/delivery-policy/delivery-policy.module').then(m => m.DeliveryPolicyPageModule)
          }
        ]
      },
      {
        path: 'privacyPolicy',
        children: [
          {
            path: '',
            loadChildren: () => import('../sidePanel/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
          }
        ]
      },
      {
        path: 'myProfile',
        children: [
          {
            path: '',
            loadChildren: () => import('../sidePanel/my-profile/my-profile.module').then(m => m.MyProfilePageModule)
          }
        ]
      },
      {
        path: 'myOrders',
        children: [
          {
            path: '',
            loadChildren: () => import('../sidePanel/my-orders/my-orders.module').then(m => m.MyOrdersPageModule)
          }
        ]
      },
      {
        path: 'checkout',
        children: [
          {
            path: '',
            loadChildren: () => import('../order/checkout/checkout.module').then(m => m.CheckoutPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
