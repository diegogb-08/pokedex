import { ADD, CLEAN } from '../types/pokemonType';

const initialState = {
    pokeList: [],
};

const pokemonReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD :
            return {
                ...state,
                pokeList : action.payload,
                
            }

        case CLEAN :
            return initialState

        default :
            return state
    }
};

export default pokemonReducer;