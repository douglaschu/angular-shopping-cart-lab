//The routing module takes care of navigating between pages, in this case between the main page listing all the products and individual pages for each product, based on the product's ID.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'cart-items', pathMatch: 'full' }, //This sets the default URL as /cart-items, as seen in the Products component. 
  { path: 'cart-items', component: ProductsComponent},
  { path: 'cart-items/:id', component: ProductsComponent},    
];
// this sets the URLS for each page.  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
