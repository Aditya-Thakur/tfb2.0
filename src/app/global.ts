import { Product } from './models/product';
import { Cart } from './models/cart';
import { CartItem} from './models/cart-item';

export const Global = {
    loggedIn: false,
    loggedInUser: {
        id: 0,
        name: '',
        email: '',
        contactno: 0,
        password: '',
        shippingAddress: '',
        landMark: '',
        shippingState: '',
        shippingCity: '',
        shippingPincode: 0,
        billingAddress: '',
        billingState: '',
        billingCity: '',
        billingPincode: 0,
        regDate: '',
        updationDate: '',
        ip: '',
        message: ''
    },
    showCurrentProduct : false,
    currentProductId: 0,
    cartActive : false,
    products: [{
    id: 0,
    category: 0,
    subcategory: 0,
    productName: '',
    productCompany: '',
    productPrice: 0,
    productPriceBeforeDiscount: 0,
    productDescription: '',
    productImage1: '',
    productImage2: '',
    productImage3: '',
    shippingCharge: 0,
    productAvailability: '',
    postingDate: new Date(),
    updationDate: new Date(),
    priceVarietyAvailable: false
    }],
    myCart: new Cart({
        myCartItems: new Array<CartItem>(),
        // [{
        //     product: {
        //         id: '',
        //         category: '',
        //         subcategory: '',
        //         productName: '',
        //         productCompany: '',
        //         productPrice: '',
        //         productPriceBeforeDiscount: '',
        //         productDescription: '',
        //         productImage1: '',
        //         productImage2: '',
        //         productImage3: '',
        //         shippingCharge: '',
        //         productAvailability: '',
        //         postingDate: new Date(),
        //         updationDate: new Date()
        //       },
        //       productVariety: {
        //         id: '',
        //       productId: '',
        //       quantityType: '',
        //       productQuantity: '',
        //       productPrice: ''
        //       },
        //       quantity: 0
        //   }],
          getTotalCartPrice: () => 0,
          getQuantity: (product: Product) => 0,
          getTotalItemCount: () => 0,
          getTotalDiscountPrice: () => 0
    }),
    cart : {},
     backendUrl: 'http://theflyingbasket.com/backend',
     availableLocation: [721645, 721657, 721635, 721602, 721606, 721607, 721654, 721452, 721628, 721603, 721658, 721631, 721604, 721607]
};
