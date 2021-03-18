import {combineReducers} from 'redux';
import category from './category';
import product from './product';
import type from './type';
import signin from './signin';
import statusLogin from './statusLogin';
import cart from './cart';
import favourite from './favourite';
import notification from './notification';
const rootReducers = combineReducers({
    category : category,
    product : product,
    type : type,
    signin : signin,
    statusLogin : statusLogin,
    cart : cart,
    favourite : favourite,
    notification : notification
});
export default rootReducers;