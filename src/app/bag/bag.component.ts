import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-list/shared/product.service';
import { Product } from '../product-list/shared/product';
import { Router, ActivatedRoute } from '@angular/router';
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
    let obj = JSON.parse(this.key);
    let keyList = Object.keys(obj);

    this.productBag = [];
    for (let i = 0; i < keyList.length; i++) {
      this.pS.getOneProduct(keyList[i]).subscribe(
        result => { this.productBag.push(result.payload.val()); }
      );
    }
  }
}
