import { Carrito } from './../models/carrito';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { map } from 'rxjs/operators';

export interface carritoItem{
  producto: Producto,
  cantidad: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public products: Producto[];
  public carrito: carritoItem[] = [];

  constructor(private firestore: AngularFirestore) { 
    this.products=[{
    product:"Azucar",
    descripcion:"Bolsa de 1k",
    photo:"https://picsum.photos/200/?random=1",
    precio:20},
    {product:"Leche",
      descripcion:"De 1 litro ",
    photo:"https://picsum.photos/200/?random=2",
    precio:32},
    {product:"Galletas",
      descripcion:"De Chocolate",
    photo:"https://picsum.photos/200/?id=3",
    precio:15},
  ];
  }

  public getProducts(){
    return this.firestore.collection('productos').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    );
  }

  public getCart(){
    return this.firestore.collection('carrito').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Carrito;
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    );
  }

  public getProductById(id:string){
    let result = this.firestore.collection('productos').doc(id).valueChanges();
    return result;
  }

  public getProductByIdCarrito(id:string){
    let result = this.firestore.collection('carrito').doc(id).valueChanges();
    return result;
  }

  public removeProduct(i: string){
      this.firestore.collection('productos').doc(i).delete();
  }

  public removeCarr(i: string){
    this.firestore.collection('carrito').doc(i).delete();
}

public newProduct(produ: Producto) {
  this.firestore.collection('productos').add(produ);
}

public updateCantidad(product:Carrito, id:string){
  this.firestore.collection('carrito').doc(id).update(product);
}

public saveCarrito(product:Carrito){
  this.firestore.collection('carrito').add(product);
}
}
