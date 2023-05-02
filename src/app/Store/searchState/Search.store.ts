import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Fruits } from 'src/app/interface/fruits';


export interface SearchState {
    itemsSearch: Fruits[],
}

export const initialState: SearchState = {
    itemsSearch: []

};

export const selectSearch = createFeatureSelector<SearchState>('SearchPrOducts');
export const selectSearchItemss = createSelector(
    selectSearch,
    (state: SearchState) => state.itemsSearch
);


