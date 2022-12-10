import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductCarritoPageRoutingModule } from './view-product-carrito-routing.module';

import { ViewProductCarritoPage } from './view-product-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductCarritoPageRoutingModule
  ],
  declarations: [ViewProductCarritoPage]
})
export class ViewProductCarritoPageModule {}
