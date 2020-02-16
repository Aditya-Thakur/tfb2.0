import { Cart } from './cart';

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
