import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to hold search term as behaviour
  searchTerm = new BehaviorSubject('')
  // to hold cart total count
  cartItemCount = new BehaviorSubject(0)

  // BASE_URL = 'http://localhost:3000'

  // hosted url
BASE_URL = 'https://ecart-8ozg.onrender.com'

  constructor(private http: HttpClient) {
    this.cartCount()
  }

  //get all products api
  getAllProducts() {
    return this.http.get(`${this.BASE_URL}/products/get-all-products`)
  }

  // view product details api
  viewAProduct(id: any) {
    return this.http.get(`${this.BASE_URL}/products/${id}`)
  }

  //add to wishlist
  addToWishlist(product: any) {

    const { id, title, price, image } = product
    const body = {
      id,
      title,
      price,
      image
    }
    //api call
    return this.http.post(`${this.BASE_URL}/products/add-to-wishlist`, body)
  }
  //api call to get all wishlist item
  getAllWishlistItem() {

    return this.http.get(`${this.BASE_URL}/wishlist/get-all-items`)
  }

  //api call remove item from wishlist
  removeItemFromWishlist(id: any) {
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`)
  }

  //add to cart
  addToCart(product: any) {
    const body = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: product.quantity
    }
    //api call
    return this.http.post(`${this.BASE_URL}/products/add-to-cart`, body)
  }

  // get all cart items
  getAllCartItem() {
    //api
    return this.http.get(`${this.BASE_URL}/cart/get-all-cartitems`)
  }
  //cart count
  cartCount() {
    this.http.get(`${this.BASE_URL}/cart/get-all-cartitems`).subscribe((result: any) => {
      this.cartItemCount.next(result.length)
    })
  }
  removeCartItem(id: any) {
    //api call
    return this.http.delete(`${this.BASE_URL}/cart/item/${id}`)
  }

  // increament cart
  increamentCartItem(id: any) {
    return this.http.get(`${this.BASE_URL}/cart/increament-item/${id}`)
  }

  // decreament cart
  decreamentCartItem(id: any) {
    return this.http.get(`${this.BASE_URL}/cart/decreament-item/${id}`)
  }

  // empty cart 
  emptyCart() {
    return this.http.delete(`${this.BASE_URL}/cart/empty-cart`)
  }
}

