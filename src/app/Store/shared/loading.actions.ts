import { createAction, props } from '@ngrx/store';


export const showLoading = createAction(
    '[Loading] show Loading',
    props<{ status: Boolean }>()
);
