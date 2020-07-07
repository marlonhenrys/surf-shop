import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Produto } from '../interfaces/produto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private productsCollection: AngularFirestoreCollection<Produto>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection<Produto>('Produtos');
  }

  getProducts() {
    return this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addProduct(produto: Produto) {
    return this.productsCollection.add(produto);
  }

  getProduct(id: string) {
    return this.productsCollection.doc<Produto>(id).valueChanges();
  }

  updateProduct(id: string, produto: Produto) {
    return this.productsCollection.doc<Produto>(id).update(produto);
  }

  deleteProduct(id: string) {
    return this.productsCollection.doc(id).delete();
  }
}