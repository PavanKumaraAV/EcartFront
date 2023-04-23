
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
//paypal import
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //paypal property
  public payPalConfig?: IPayPalConfig;

  allCartItems: any = []
  makePaymentStatus: boolean = false
  cartTotalPrice: number = 0
  offerStatus: boolean = false
  finalAmount: number = 0
  offerTagStatus: boolean = true
  paymentBtn: boolean = false
  showSuccess: boolean = false
  showCancel: boolean = false
  showError: boolean = false
  user: any = {

  }

  addressForm = this.fb.group({
    username: [''],
    address1: [''],
    address2: [''],
    state: ['']
  })

  constructor(private api: ApiService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.getCart()
    // call paypal
    this.initConfig();

  }

  getCart() {
    this.api.getAllCartItem().subscribe((result: any) => {
      console.log(result)
      this.allCartItems = result
      this.getCartTotalPrice()
    },
      (error: any) => {
        console.log(error)
      })
  }
  // get total price of cart
  getCartTotalPrice() {
    let total = 0
    this.allCartItems.forEach((item: any) => {
      total += item.grandTotal
      this.cartTotalPrice = Math.ceil(total)
      this.finalAmount = this.cartTotalPrice
    })
  }

  removeItem(id: any) {
    this.api.removeCartItem(id).subscribe((result: any) => {
      this.allCartItems = result
      //to update the price
      this.getCartTotalPrice()
      // to update the count
      this.api.cartCount()

    },
      (result: any) => {
        console.log(result.error)
      })
  }

  increamentCart(id: any) {
    this.api.increamentCartItem(id).subscribe((result: any) => {
      this.allCartItems = result
      //to update the price
      this.getCartTotalPrice()
      // to update the count
      this.api.cartCount()

    },
      (result: any) => {
        console.log(result.error)
      })

  }

  //decreament cart item
  decreamentCart(id: any) {
    this.api.decreamentCartItem(id).subscribe((result: any) => {
      this.allCartItems = result
      //to update the price
      this.getCartTotalPrice()
      // to update the count
      this.api.cartCount()

    },
      (result: any) => {
        console.log(result.error)
      })

  }

  emptyCart() {
    this.api.emptyCart().subscribe((result) => {
      this.allCartItems = []
      alert(result)
      this.getCartTotalPrice()
      this.api.cartCount()
    },
      (result: any) => {
        alert(result.error)
      })
  }

  //to view offers
  viewOffers() {
    this.offerStatus = true
  }
  // discount of total purchase under 500
  discount10() {
    let discount = this.cartTotalPrice * 10 / 100
    this.finalAmount = this.cartTotalPrice - discount
    this.offerStatus = false
    this.offerTagStatus = false
  }

  discount50() {
    let discount = this.cartTotalPrice * 50 / 100
    this.finalAmount = this.cartTotalPrice - discount
    this.offerStatus = false
    this.offerTagStatus = false
  }

  submit() {
    if (this.addressForm.valid) {
      this.paymentBtn = true

      this.user.username = this.addressForm.value.username
      this.user.address1 = this.addressForm.value.address1
      this.user.address2 = this.addressForm.value.address2
      this.user.state = this.addressForm.value.state
    }
    else {
      alert('Invalid Form')
    }
  }

  //make payment status
  makePayment() {
    this.makePaymentStatus = true
  }

  // paypal function
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        this.emptyCart()
        this.makePaymentStatus = false
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
        this.makePaymentStatus = false
      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
        this.makePaymentStatus = true
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.makePaymentStatus = true
        // this.resetStatus();
      }
    };
  }

  closeModal() {
    this.addressForm.reset()
    this.paymentBtn = false
    this.makePaymentStatus = false
    this.showCancel = false
    this.showSuccess = false
    this.showError = false
  }
}
