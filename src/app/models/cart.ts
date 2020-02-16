import { Product } from './product';
import { CartItem } from './cart-item';

export class Cart {
    myCartItems: CartItem[] = [];
    totalCartPrice = 0;
  constructor(myCartItemList) {
    this.myCartItems = myCartItemList;
  }

  getTotalCartPrice(): number {
    let totalPrice = 0;
    if (this.myCartItems.length > 0) {
      this.myCartItems.forEach(element => {
        totalPrice += element.productVariety.productPrice * element.quantity;
      });
    }
    if (totalPrice !== 0 && totalPrice < 300) {
      totalPrice += 20;
    }
    this.totalCartPrice = totalPrice;
    return totalPrice;
  }

  getQuantity(product: Product): number {
    if (this.myCartItems.length > 0) {
      const index = this.myCartItems.findIndex((e) => e.product.id === product.id);
      if (index === -1) {
        return 0;
      } else {
        return this.myCartItems[index].quantity;
      }
    } else {
      return 0;
    }
  }


  getTotalItemCount(): number {
    let totalCount = 0;
    if (this.myCartItems.length > 0) {
      this.myCartItems.forEach(element => {
        totalCount += element.quantity;
      });
    }
    return totalCount;
  }

  getTotalDiscountPrice(): number {
    let totalDiscount = 0;
    if (this.myCartItems.length > 0) {
      this.myCartItems.forEach(element => {
        totalDiscount += (element.product.productPriceBeforeDiscount - element.product.productPrice) * element.quantity;
      });
    }
    return totalDiscount;
  }

}
