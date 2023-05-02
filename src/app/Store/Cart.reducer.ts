import { createReducer, on } from '@ngrx/store';
import { addToCart, IncreaseQte, removeFromCart } from './Cart.actions';
import { initialState } from './Cart.store';

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { Cartitems }) => {
        const findcartindex = state.items.findIndex((item) => item.fruit.id === Cartitems.fruit.id)
        if (findcartindex >= 0) {
            const updatedItem = {
                ...state.items[findcartindex], qte: + state.items[findcartindex].qte + +Cartitems.qte
            };
            const total = state.total + (Cartitems.fruit.price * Cartitems.qte.valueOf())

            localStorage.setItem('CartItems', JSON.stringify({ items: state.items.map(item => item.fruit.id === Cartitems.fruit.id ? updatedItem : item), total }))
            return { items: state.items.map(item => item.fruit.id === Cartitems.fruit.id ? updatedItem : item), total }
        } else {
            const temp = {
                ...state,
                items: [...state.items, Cartitems],
                total: state.total + (Cartitems.fruit.price * Cartitems.qte.valueOf())
            };

            const localStorageCart = { ...temp, }
            localStorage.setItem('CartItems', JSON.stringify(localStorageCart))
            return { ...temp, }
        }
    }),
    on(removeFromCart, (state, { productId }) => {
        const itemToRemove = state.items.find(item => item.fruit.id === productId);
        const total = state.total - (itemToRemove.fruit.price * itemToRemove.qte.valueOf())
        const remove = { items: state.items.filter(item => item.fruit.id !== productId), total }
        localStorage.setItem("CartItems", JSON.stringify(remove))
        return {
            ...state,
            items: state.items.filter(item => item.fruit.id !== productId), total
        };

    }), on(IncreaseQte, (state, action) => {
        const find = state.items.findIndex((fr) => fr.fruit.id === action.fruit.id);
        const updatedItems = [...state.items];
        updatedItems[find] = {
            ...state.items[find], qte: +state.items[find].qte + + 1
        };
        const newTotal = updatedItems.reduce((acc, item: any) => acc + (item.fruit.price * item.qte), 0);
        const newState = {
            ...state,
            items: updatedItems,
            total: newTotal
        }
        localStorage.setItem('CartItems', JSON.stringify(newState));
        return newState;
    })
);