import { ActivatedRoute } from '@angular/router';
import { ProductoService } from './../services/producto.service';
import { Carrito } from './../models/carrito';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product-carrito',
  templateUrl: './view-product-carrito.page.html',
  styleUrls: ['./view-product-carrito.page.scss'],
})
export class ViewProductCarritoPage implements OnInit {

  public producto: Carrito;

  constructor(private productService: ProductoService, private activatedRoute: ActivatedRoute) { 
    this.producto ={
      product:"",
      descripcion:"",
      photo: "",
      precio: 0,
      cantidad:0,
      id:""
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productService.getProductByIdCarrito(params.id).subscribe(item=>{
        console.log(item);
        this.producto = item as Carrito;
      })
      
    });
  }

}
