import { createReducer, on } from '@ngrx/store';
import { SearchArray } from './Search.actions';
import { initialState } from './Search.store';

export const SearchReducer = createReducer(
    initialState,
    on(SearchArray, (state, { arrayfruit }) => (
        {
            itemsSearch: [arrayfruit]

        }))

);