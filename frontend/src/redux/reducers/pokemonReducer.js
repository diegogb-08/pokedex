import { ADD, CLEAN, COMPARE } from '../types/pokemonType';

const initialState = {
    pokeList: [],
    compareList: []
};

const pokemonReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD :
            return {
                ...state,
                pokeList : action.payload,
                
            }

        case COMPARE :
        return {
            ...state,
            compareList : [...state.compareList, action.payload],
            
        }

        case CLEAN :
            return initialState

        default :
            return state
    }
};

export default pokemonReducer;