import {combineReducers} from 'redux';
import category from './category';
import product from './product';
import type from './type';
import signin from './signin';
import statusLogin from './statusLogin';
import cart from './cart';
import favourite from './favourite';
import notification from './notification';
import search_product_name from './search_product_name';
const rootReducers = combineReducers({
    category : category,
    product : product,
    type : type,
    signin : signin,
    statusLogin : statusLogin,
    cart : cart,
    favourite : favourite,
    notification : notification,
    search_product_name : search_product_name
});
export default rootReducers;