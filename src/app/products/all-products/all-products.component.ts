import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: any
  searchKey: string = ''

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllProducts().subscribe((result: any) => {
      console.log(result)
      this.allProducts = result
    },
      (result: any) => {
        console.log(result)
      }
    )
    //get behaviour subject from api
    this.api.searchTerm.subscribe((result: any) => {
      this.searchKey = result
    })

  }
  addToCart(product: any) {
    // add quantity  key to product object  with value 1
    Object.assign(product, { quantity: 1 })
    console.log(product)
    // call api
    this.api.addToCart(product).subscribe((result:any)=>{
      this.api.cartCount()
      alert(result)
    },
    (error : any)=>{
      alert(error )
    })
  }
}
