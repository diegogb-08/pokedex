import {combineReducers} from 'redux';
import userReducer from './userReducer';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
    userReducer,
    pokemonReducer
});

export default rootReducer;
