import { ADD, CLEAN, CLEAR, COMPARE, REMOVE } from '../types/pokemonType';

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
        
        case REMOVE:
            const numIndex = parseInt(action.payload)
            return {
                ...state,
                compareList: [
                    ...state.compareList.slice(0, numIndex),
                    ...state.compareList.slice(numIndex + 1)
                ]
            }

        case CLEAR:
            return {
                ...state,
                compareList: action.payload
            };

        case CLEAN :
            return initialState

        default :
            return state
    }
};

export default pokemonReducer;