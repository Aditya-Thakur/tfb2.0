import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchPageRoutingModule,
    AutoCompleteModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
