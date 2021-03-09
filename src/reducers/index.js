import {combineReducers} from 'redux';
import category from './category';
import product from './product';
import type from './type';
import signin from './signin';
import statusLogin from './statusLogin';
const rootReducers = combineReducers({
    category : category,
    product : product,
    type : type,
    signin : signin,
    statusLogin : statusLogin
});
export default rootReducers;