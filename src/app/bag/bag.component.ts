import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-list/shared/product.service';
import { Product } from '../product-list/shared/product';
import { Router, ActivatedRoute } from '@angular/router'; // importuoti routinga
@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {
  productBag: any;
  key: any;
  cart: any;
  constructor(
    private pS: ProductService,
    private aR: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = localStorage.getItem('cart');
    console.log(this.key);
    let obj = JSON.parse(this.key);
    let keyList = Object.keys(obj);
    console.log('spausdina keys', Object.keys(obj));
    console.log('spausdina values', Object.values(obj));
    console.log(keyList.length);
    // this.productBag = this.pS.getProductsByKey().subscribe(
    //   result => { this.productBag = result.payload.val(); }
    // );
    console.log(this.productBag);

    this.productBag = [];
    // for (let i = 0; i < keyList.length; i++) {
    //   this.productBag.push(this.pS.getOneProduct(keyList[i]).subscribe(
    // result => { this.productBag = result.payload.val(); }
    // ));
    // }
    for (let i = 0; i < keyList.length; i++) {
      this.productBag.push(this.aR.params.subscribe(
        result => {
          this.pS.getOneProduct(keyList[i]).subscribe(
            result => { this.productBag = result.payload.val(); }
          );
        }
      ));
    }
    console.log(this.productBag);
    console.log(Object.values(this.productBag));
    this.cart = Object.keys(this.productBag);
  }
}
