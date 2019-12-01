import { Product } from './product';
import { ProductVariety } from './product-variety';

export interface CartItem {
    product: Product;
    productVariety: ProductVariety;
    quantity: number;
}
