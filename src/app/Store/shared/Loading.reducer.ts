import { createReducer, on } from '@ngrx/store';
import { showLoading } from './loading.actions';
import { initialState } from './Loading.store';


export const LoadingReducer = createReducer(
    initialState,
    on(showLoading, (state, action) => {
        return { state, isLoading: action.status }

    }))