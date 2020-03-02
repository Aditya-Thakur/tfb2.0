import { Cart } from './cart';
import { CartItem } from './cart-item';

export interface Order {
    id: number;
    userId: number;
    cart: Cart;
    orderDate: string;
    paymentMethod: string;
    shippingAddress: string;
    landMark: string;
    shippingState: string;
    shippingCity: string;
    shippingPincode: number;
    contactno: number;
    orderStatus: string;
    totalCartPrice: number;
}

export interface OrderToSend {
    id: number;
    userId: number;
    cart: {
        myCartItems: CartItem[]
    };
    orderDate: string;
    paymentMethod: string;
    shippingAddress: string;
    landMark: string;
    shippingState: string;
    shippingCity: string;
    shippingPincode: number;
    contactno: number;
    orderStatus: string;
    totalCartPrice: number;
}
