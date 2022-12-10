import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductCarritoPage } from './view-product-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProductCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProductCarritoPageRoutingModule {}
