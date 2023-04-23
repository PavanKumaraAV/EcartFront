import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  viewId: string = ''
  productDetails : any
  constructor(private viewActivatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    // get path parameter from component route
    this.viewActivatedRoute.params.subscribe((data: any) => {
      this.viewId = data.id

    })
    this.api.viewAProduct(this.viewId).subscribe((result: any) => {
      console.log(result)
      this.productDetails = result

    },
    (error : any)=>{
      console.log(error)
    })
  }

  addtoWishlist(product : any) {
    this.api.addToWishlist(this.productDetails).subscribe((result : any)=>{
      alert(result)
    },
    (error : any)=>{
      alert(error.error)
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
