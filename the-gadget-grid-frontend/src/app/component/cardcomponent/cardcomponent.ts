import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Productservice } from '../../service.product/productservice';

@Component({
  selector: 'app-cardcomponent',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, FormsModule], 
  templateUrl: './cardcomponent.html',
  styleUrl: './cardcomponent.css',
})
export class Cardcomponent implements OnInit {
  cartItems: any[] = [];
  paymentStatus: string = 'Paid'; 

  constructor(private productService: Productservice) {}

  ngOnInit(): void {
        this.cartItems = this.productService.getCartItems();
  }


  getGrandTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.productService.updateCart(this.cartItems);
  }


  updateQuantity(index: number, change: number) {
    if (this.cartItems[index].quantity + change > 0) {
      this.cartItems[index].quantity += change;
      this.productService.updateCart(this.cartItems);
    }
  }


  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }


    const loggedUserId = this.cartItems[0].logedUserID;
    const netAmount = this.getGrandTotal();


    const orderedProducts = this.cartItems.map(item => {
      return {
        "Product ID": item.addedProductID,
        "Product Name": item.productName || 'N/A',
        "Quantity": item.quantity,
        "Unit Price": item.price,
        "Sub Total": (item.price * item.quantity)
      };
    });

    console.log("%c--- FINAL CHECKOUT SUMMARY ---", "color: #2563eb; font-weight: bold; font-size: 16px;");
    console.log(`%cLogged User ID    : ${loggedUserId}`, "color: #8b5cf6; font-weight: bold; font-size: 12px;");
    console.log(`%cPayment Status    : ${this.paymentStatus}`, "color: #f59e0b; font-weight: bold; font-size: 12px;");
    console.log(`%cFinal Net Amount  : RS. ${netAmount}`, "color: #10b981; font-weight: bold; font-size: 14px;");
    console.log("%cOrdered Products List:", "color: #64748b; font-weight: bold;");
    console.table(orderedProducts); 
    console.log("%c---------------------------------", "color: #64748b;");

    const orderData = {
      user: { userId: parseInt(loggedUserId) },
      totalAmount: netAmount,
      paymentStatus: this.paymentStatus,
      orderStatus: "Processing",
      orderItems: this.cartItems.map(item => ({
        product: { productId: item.addedProductID },
        quantity: item.quantity,
        priceAtPurchase: item.price
      }))
    };

    this.productService.placeOrder(orderData).subscribe({
      next: (res) => {
        alert(`Order Placed Successfully! \nUser ID: ${loggedUserId} \nTotal: RS. ${netAmount}`);
        this.cartItems = [];
        this.productService.updateCart([]);
      },
      error: (err) => {
        console.error('Checkout Error:', err);
        alert('Order failed! Please check console.');
      }
    });
  }
}