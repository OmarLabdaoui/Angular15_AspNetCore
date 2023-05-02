import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface Loading {
    isLoading: Boolean
}

export const initialState: Loading = {
    isLoading: false
};

export const selectisLoading = createFeatureSelector<Loading>('loading');

export const selectloadingState = createSelector(
    selectisLoading,
    (state: Loading) => state.isLoading
);
