import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import { Router, ActivatedRoute } from '@angular/router'; // importuoti routinga
// filtravimui ir tt
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { Product } from './shared/product';
import { Subject } from 'rxjs/Subject';
// import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any;
  filteredProducts: any;
  // ----------
  size: string;
  key: string;
  filters = {};
  searchProducts;
  startAt = new Subject();
  endAt = new Subject();
  constructor(
    private pS: ProductService,
    private router: Router,
    // private db: AngularFireDatabase,
  ) {}


  ngOnInit() {
    this.products = this.pS.getAll();
    // this.filteredProducts = this.products.getFiltered();
    this.applyFilters();
    console.log(this.products);
    console.log(this.filteredProducts);
    // this.pS.getProducts(this.startAt, this.endAt).subscribe(
    //   searchProducts => this.searchProducts = searchProducts
    // );
  }
  search($event) {
    let q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
  }
  private applyFilters() {
    this.filteredProducts = _.filter(this.products, _.conforms(this.filters));
  }
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule;
    this.applyFilters();
  }
  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }
  remove(key: string) {
    this.pS.delete(key);
  }
  addToBag(key: string) {
    // this.productBag = this.pS.getOneProduct(key);
    let cart = JSON.parse(localStorage.getItem('cart'));
    // patikrinti ar raktas jau yra tai prideti i pati key +1 value
    console.log(cart);
    if (cart === null) {
      console.log(cart);
      cart = {};
      cart[key] = {quantity : 1 };
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      if (cart[key]) {
        cart[key].quantity = cart[key].quantity + 1;
      } else {
        cart[key] = { quantity: 1 };
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    // let count1 = Number(count);
    // count = (count1 + 1) + '';
    // var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : { items: [] };
    // -------------------------------------
    // cart = { "-LNHCgdg25584654": 1}
    // ---------------------------------------
    // jeigu krepselis tuscias sukurti nauja

    // jeigu krepselis jau yra bet key nera, tada prideti tik key ir value 1

    // ir issaugoti i localstorage Json.stringfy(cart)
    // cart = cart.split('');
    // cart.push(key);
    // localStorage.setItem('cart', cart);
    // this.router.navigate(['/bag']);
  }

}
