import { createAction, props } from '@ngrx/store';
import { CartItem } from '../interface/CartItem';
import { Fruits } from '../interface/fruits';

export const addToCart = createAction(
    '[Cart] Add Item To Cart',
    props<{ Cartitems: CartItem }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove Item',
    props<{ productId: string }>()
);
export const IncreaseQte = createAction('[Cart] Increase Quantity by 1', props<{ fruit: Fruits }>());