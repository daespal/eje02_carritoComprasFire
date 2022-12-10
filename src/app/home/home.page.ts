import { Carrito } from './../models/carrito';
import { Component } from '@angular/core';
import { Producto } from './../models/producto';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public products: Producto[];
  public carr:Carrito;

  constructor(public productService: ProductoService, private router: Router, private alertController: AlertController ) {
      this.productService.getProducts().subscribe(res => {
      this.products = res;
     
    });
  }

  public async removeProduct(id:string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.productService.removeProduct(id);
          }
        }
      ]
    });

    await alert.present();



  }

  public getProductById(id:string){
    this.router.navigate(['/view-product'],{
      queryParams: {id: id},
    })
  }
 
  public viewCart(){
    this.router.navigate(['carrito']);
  }

  public addProduct(){
    this.router.navigate(['new-product']);
  }

  public addCarrito(photo:string,product:string,descripcion:string,precio:number){
    this.router.navigate(['/carrito'], {
      queryParams: { photo:photo,product:product,descripcion:descripcion,precio:precio }
    });
  }

  async addProductCarrito(p:string,d:string,pr:number,pho:string) {
    const alert = await this.alertController.create({
      header: 'Nuevo producto',
      inputs: [
        {
          name:'cantidad',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Agregar a Carrito',
          handler: (inputs: {cantidad:number}) => {
            this.carr = {
              product:p,
              descripcion:d,
              photo:pho,
              precio:pr,
              cantidad:inputs.cantidad
        
            }
            this.productService.saveCarrito(this.carr);
          }
        }
      ]

      
    });

    await alert.present();
  }
}
