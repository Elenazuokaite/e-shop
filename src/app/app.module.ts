import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BagComponent } from './bag/bag.component';
import { NavComponent } from './nav/nav.component';
import { AddProductComponent } from './product-list/add-product/add-product.component';
import { FormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { ProductService } from './product-list/shared/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    BagComponent,
    NavComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
