import {combineReducers} from 'redux';
import category from './category';
import product from './product';
import type from './type';
const rootReducers = combineReducers({
    category : category,
    product : product,
    type : type
});
export default rootReducers;