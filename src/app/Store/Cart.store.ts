import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartItem } from '../interface/CartItem';

export interface CartState {
    items: CartItem[];
    total?: number
}

export const initialState: CartState = {
    items: localStorage.getItem('CartItems') ? JSON.parse(localStorage.getItem('CartItems')).temp?.items ?? JSON.parse(localStorage.getItem('CartItems')).items : [],
    total: localStorage.getItem('CartItems') ? JSON.parse(localStorage.getItem('CartItems')).total ?? 0 : 0
};

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCart,
    (state: CartState) => state.items
);

export const selectCartItemsQte = createSelector(
    selectCart,
    (state: CartState) => state.items.length
);
export const selectCartItemstotal = createSelector(
    selectCart,
    (state: CartState) => state.total
);