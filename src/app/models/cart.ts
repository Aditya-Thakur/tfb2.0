import { Product } from './product';
import { CartItem } from './cart-item';
import { ProductVariety } from './product-variety';

export class Cart {
  // myCartItems: CartItem[] = [];
  myCartItems = new Set<CartItem>([]);
  totalCartPrice = 0;
  totalCartPriceWithoutShippingCharge = 0;
  constructor(myCartItemList) {
    this.myCartItems = myCartItemList;
  }

  getTotalCartPrice(): number {
    let totalPrice = 0;
    console.log('in getTotalCartPrice', this.myCartItems.size);
    if (this.myCartItems.size > 0) {
      console.log('with size ', this.myCartItems.size);
      this.myCartItems.forEach(element => {
        totalPrice += element.productVariety.productPrice * element.quantity;
      });
    }
    if (totalPrice !== 0 && totalPrice < 299) {
      totalPrice += 20;
      this.totalCartPrice = totalPrice;
      return this.totalCartPrice;
    } else {
      this.totalCartPrice = totalPrice;
      return this.totalCartPrice;
    }
  }
  getTotalCartPriceWithoutShippingCharge(): number {
    let totalPrice = 0;
    if (this.myCartItems.size > 0) {
      this.myCartItems.forEach(element => {
        totalPrice += element.productVariety.productPrice * element.quantity;
      });
    }
    this.totalCartPriceWithoutShippingCharge = totalPrice;
    return this.totalCartPriceWithoutShippingCharge;

  }

  getQuantity(product: Product, productVariety: ProductVariety): number {
    if (this.myCartItems.size > 0) {
      if (productVariety === null || productVariety === undefined) {
        return 0;
      }
      // const index = this.myCartItems.findIndex(
      //   (e) => (e.product.id === product.id) && (e.productVariety.id === productVariety.id)
      // );
      // this.myCartItems.has()
      // if (index === -1) {
      //   return 0;
      // } else {
      //   return this.myCartItems[index].quantity;
      // }
      let quantity = 0;
      this.myCartItems.forEach(item => {
        if (item.product.id === product.id && item.productVariety.id === productVariety.id) {
          quantity = item.quantity;
        }
      });
      return quantity;
    } else {
      return 0;
    }
  }


  getTotalItemCount(): number {
    let totalCount = 0;
    if (this.myCartItems.size > 0) {
      this.myCartItems.forEach(element => {
        totalCount += element.quantity;
      });
    }
    return totalCount;
  }

  getTotalDiscountPrice(): number {
    let totalDiscount = 0;
    if (this.myCartItems.size > 0) {
      this.myCartItems.forEach(element => {
        totalDiscount += (element.product.productPriceBeforeDiscount - element.product.productPrice) * element.quantity;
      });
    }
    return totalDiscount;
  }

}

