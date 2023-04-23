import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

allItems : any = []
constructor(private api : ApiService){

}
ngOnInit(): void {
    
    this.api.getAllWishlistItem().subscribe((result:any)=>{
      this.allItems = result
    },
    (error: any)=>{
        alert(error)
    })
}
removeItem(id : any) {

  this.api.removeItemFromWishlist(id).subscribe((result:any)=>{
    this.allItems = result
  },
  (error:any)=>{
    console.log(error)
  })
}
 addToCart(product: any) {
    // add quantity  key to product object  with value 1
    Object.assign(product, { quantity: 1 })
    console.log(product)
    // call api
    this.api.addToCart(product).subscribe((result:any)=>{
      this.api.cartCount()
      this.removeItem(product.id)
      alert(result)
    },
    (error : any)=>{
      alert(error )
    })
  }
}
