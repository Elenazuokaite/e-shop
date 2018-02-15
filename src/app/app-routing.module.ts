import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { BagComponent } from './bag/bag.component';
import { NavComponent } from './nav/nav.component';
import { AddProductComponent } from './product-list/add-product/add-product.component';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'bag', component: BagComponent },
    { path: 'addProduct', component: AddProductComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
