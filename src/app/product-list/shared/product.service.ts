import { Injectable } from '@angular/core';
import {
    AngularFireList, AngularFireDatabase
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {
    products: AngularFireList<any>;
    key: any;
    filteredProducts: any;
    size: any;
    filters = {};
    constructor(
        private afd: AngularFireDatabase
    ) {
        this.products = afd.list('products');
    }
    private uploadTask: firebase.storage.UploadTask;
    getAll() {
        return this.products.snapshotChanges().map(
            changes => {
                return changes.map(
                    mainChanges => ({
                        key: mainChanges.payload.key,
                        ...mainChanges.payload.val(),
                    })
                );
            }
        );
    }
    getOneProduct(key: any) {
        const product = `/products/${key}`;
        return this.afd.object(product).snapshotChanges();
    }
    cteateProduct(form: any, upload: any) {
        let storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child(`/products/${upload[0].name}`).put(upload[0]);
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                upload[0].progress = upload[0].progress =
                    (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
            },
            () => {
                form['file_name'] = upload[0].name;
                form['url'] = this.uploadTask.snapshot.downloadURL;
                this.products.push(form);
            }
        );
    }
    update(key: any, form: any) {
        this.products.update(key, form);
    }
    delete(key: string) {
        this.products.remove(key);
    }
}
