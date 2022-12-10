import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from './../models/producto';
import { carritoItem } from './../services/producto.service';
import { Carrito } from './../models/carrito';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductoService} from '../services/producto.service';
import { AlertController } from '@ionic/angular';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  public total: number = 0;
  public carrito: carritoItem[]; 
  public car: Carrito[];
  public carr:Carrito;
  public p:string;
  public d:string;
  public pr:number;
  public pho:string;

  handlerMessage = '';
  constructor(private productService: ProductoService,private alertController: AlertController,private router: Router,
    private firestore:AngularFirestore,private activatedRoute: ActivatedRoute) {
      
    this.productService.getCart().subscribe(res => {
    this.car = res;
    this.total=0;
    this.car.forEach(i => this.total+=(i.precio*i.cantidad));
  });

  

  }


  async addProduct() {
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
              product:this.p,
              descripcion:this.d,
              photo:this.pho,
              precio:this.pr,
              cantidad:inputs.cantidad
        
            }
            this.productService.saveCarrito(this.carr);
          }
        }
      ]

      
    });

    await alert.present();
  }

  public addCarrito(){
 
  }

  async presentAlert(cantidad:number,i:string) {
    const alert = await this.alertController.create({
      header: '¿Quiere borrar un producto del carrito?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
           this.removeFromCart(cantidad,i);
           this.total=0;
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }

  public removeFromCart(cantidad:number,i:string){
    if(cantidad==1){
      this.productService.removeCarr(i);
    }else{
      cantidad=cantidad-1;
      this.firestore.collection('carrito').doc(i).update({cantidad:cantidad});
      console.log(cantidad);
    }
  }

 
  public getProductByIdCarrito(id:string){
    this.router.navigate(['/view-product-carrito'],{
      queryParams: {id: id},
    })
  }

  public goToHome(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

  
}
