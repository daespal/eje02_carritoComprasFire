import { Producto } from './../models/producto';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {

  public producto: Producto;

  constructor(private productService: ProductoService, private activatedRoute: ActivatedRoute) { 
    this.producto = {
      product: "",
      descripcion:"",
      photo: "",
      precio: 0,
      id:""
      
    }

    
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productService.getProductById(params.id).subscribe(item=>{
        console.log(item);
        this.producto = item as Producto;
      })
      
    });
  }

}
