import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ProductoService } from './../services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from './../models/producto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  public produc: Producto;
  public myForm: FormGroup;
  public validationMessages: object;

  constructor(private producService:ProductoService,  private fb: FormBuilder, private navCtrl: NavController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      product:["",Validators.required],
      descripcion:["",Validators.required],
      precio:[0,Validators.required],
      photo:["https://picsum.photos/200/300", Validators.compose([Validators.required])]
    });

    this.validationMessages = {
      'product': [
        { type: 'required', message: "Debe capturar el nombre"}
      ],
      'descripcion': [
        { type: 'required', message: "Debe capturar la descripcion"}
      ],
      'precio': [
        { type: 'required', message: "Debe capturar el precio"}
      ],
      'photo': [
        { type: 'required', message: "Debe capturar la url de la fotografía"}
      ]
    }
  }
  public newProduct() {
    this.produc = {
      product: this.myForm.controls.product.value,
      descripcion: this.myForm.controls.descripcion.value,
      precio: this.myForm.controls.precio.value,
      photo: this.myForm.controls.photo.value,
    }
    this.producService.newProduct(this.produc);
    //console.log(this.studentService.newStudent(this.student));
    

    
    
    //this.navCtrl.pop();
  }

  public async saveProduct() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas guardar el producto?',
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
            
          this.back()
          }
         
        }
      ]
    });
    this.newProduct();
    await alert.present();



  }

  back():void{
    this.router.navigateByUrl('')
  }
  }


