import { cartReducer } from "./Cart.reducer";
import { SearchReducer } from "./searchState/Search.reducer";
import { LoadingReducer } from "./shared/Loading.reducer";



export const AllReducer = {
    cart: cartReducer,
    SearchProducts: SearchReducer,
    loading: LoadingReducer
}