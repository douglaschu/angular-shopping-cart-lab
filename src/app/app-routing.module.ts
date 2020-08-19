import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'cart-items', pathMatch: 'full' }, //I think this sets the products component as the default URL
  { path: 'cart-items', component: ProductsComponent},
  { path: 'cart-items/:id', component: ProductsComponent},    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
