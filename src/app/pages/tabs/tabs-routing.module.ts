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
        path: 'product-details',
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
