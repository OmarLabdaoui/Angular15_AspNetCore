import { createAction, props } from '@ngrx/store';
import { Fruits } from '../.././interface/fruits';

export const SearchArray = createAction(
    '[SearchPrOducts] Search Array',
    props<{ arrayfruit: any }>()
);

