import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase
 } from 'angularfire2/database'; // importuoju, kad galeciau irasyti duomenis i database
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {
    products: AngularFireList<any>;
    key: any; // kintamasis
    filteredProducts: any;
    // -----
    size: any;
    filters = {};
    constructor(
        private afd: AngularFireDatabase // afd sutrumpintai = AngularFireDatabase
    ) {
        this.products = afd.list('products'); // imti info is duomenu bazeje esancios todo lenteles
        this.filteredProducts = afd.list('/products', ref => ref.orderByChild('category').equalTo('Suknelės'));
        // this.filteredProducts = afd.list('/products', {
        //     query: {
        //         orderByChild: 'category',
        //         equalTo: 'Suknelės'
        //     }
        // });
    }
    // afd.list('/products', {
    //         query: {
    //             orderByChild: 'category',
    //     equalTo: 'Suknelės'
    //         }
    //     });
    // getProducts(start, end): FirebaseListObservable<any> {
    //     return this.afd.list('/products', {
    //         query: {
    //             orderByChild: 'title',
    //             limitToFirst: 10,
    //             startAt: start,
    //             endAt: end
    //         }
    //     });
    // }
    private basePath = '/';
    private uploadTask: firebase.storage.UploadTask;

    getAll() {
        console.log(this.filteredProducts);
        return this.products.snapshotChanges().map( // snapshotChanges yra is firebase funkcija
            changes => {
                return changes.map(
                    mainChanges => ({
                        key: mainChanges.payload.key,
                        ...mainChanges.payload.val(),
                    })
                );
                // this: this.applyFilters()
            }
        );
    }
    getFiltered() {
        return this.filteredProducts;
    }
    // private applyFilters() {
    //     this.filteredProducts = _.filter(this.products, _.conforms(this.filters));
    // }
    // filterExact(property: string, rule: any) {
    //     this.filters[property] = val => val == rule;
    //     this.applyFilters();
    // }
    // removeFilter(property: string) {
    //     delete this.filters[property];
    //     this[property] = null;
    //     this.applyFilters();
    // }
    getOneProduct(key: any) {
        const product = `/products/${key}`; // iesko lenteleje todo pagal key
        return this.afd.object(product).snapshotChanges();
    }
    // getProductsByKey() {
    //     // return this.afd.list('products', ref => ref.equalTo(this.key));
    //     return this.products.snapshotChanges().map( // snapshotChanges yra is firebase funkcija
    //         changes => {
    //             return changes.map(
    //                 mainChanges => ({
    //                     key: mainChanges.payload.key,
    //                     ...mainChanges.payload.val()
    //                 })
    //             );
    //         }
    //     );
    // }

    // create(form: any) {
    //     this.products.push(form);
    //     // this.afd.list('todo').push(form) yra tas pats, kas this.todos.push(form), nes virsuje
    //     // konstruktoriuje mes priskyreme this.todos = afd.list('todo');
    // }
    cteateProduct(form: any, upload: any) {
        // this is storage function ... built in
        let storageRef = firebase.storage().ref();

        // path to /folder
        this.uploadTask = storageRef.child(`/products/${upload[0].name}`).put(upload[0]);
        // upload function to storage
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // upload in progress
                upload[0].progress = upload[0].progress =
                (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100;
            },
            (error) => {
                // upload failed
                console.log(error);
            },
            () => {
                // upload data to database
                form['file_name'] = upload[0].name;
                form['url'] = this.uploadTask.snapshot.downloadURL;
                this.products.push(form);
            }
        );
    }

    update(key: any, form: any) {
        this.products.update(key, form); // update() yra firebase funkcija
    }
    delete(key: string) {
        this.products.remove(key); // remove() yra firebase funkcija
    }
}
