import {combineReducers} from 'redux';
import category from './category';
import product from './product';
const rootReducers = combineReducers({
    category : category,
    product : product,
});
export default rootReducers;