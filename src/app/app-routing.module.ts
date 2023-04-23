import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewProductComponent } from './products/view-product/view-product.component';

const routes: Routes = [
  {
    path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: '', redirectTo: "products", pathMatch: "full"
  },
  {
    path : '**' , component : PageNotFoundComponent
  },
  {path: 'view/:id' , component : ViewProductComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
