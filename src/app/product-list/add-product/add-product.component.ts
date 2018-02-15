import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // importuoju formas is angular
import { ProductService } from '../shared/product.service'; // importuoju servisa
import { Product } from '../shared/product'; // importuoju klase
import { Router, ActivatedRoute } from '@angular/router'; // importuoti routinga
import * as _ from 'lodash';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  key: any;
  product: Product = new Product(this.key); // sukuriam kintamaji todo, priskiriame jam Todo objekta/klase

  selectedFiles: FileList;
  constructor(
    private pS: ProductService, // priskiriame klase "kintamajam"
    private router: Router,
    private aR: ActivatedRoute,
  ) { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  // uploadSingle() {
  //   let file = this.selectedFiles.item(0);
  //   this.product = new Product(file);
  //   this.pS.pushProduct(this.product);
  // }
  ngOnInit() {
    this.aR.params.subscribe(
      result => {
        this.key = result['id'];
        if (!this.key) {
          return;
        }
        this.pS.getOneProduct(this.key).subscribe(
          result => { this.product = result.payload.val(); }
        );
      }
    );
  }

  onSave(form: NgForm) {
    if (this.key) {
      this.pS.update(this.key, form.value); // update mes patys sukuriame todo.service
    } else {
      this.pS.cteateProduct(form.value, this.selectedFiles); // create mes patys sukuriame todo.service
    }
    this.router.navigate(['/']); // nukelia i sarasa
  }

}
