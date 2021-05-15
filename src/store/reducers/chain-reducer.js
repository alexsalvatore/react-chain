import {CHAIN_ADD_BLOCK, CHAIN_ADD_CHAIN} from '../actions/chain-actions';

const initialState = {
    blocks: [],
};

export const chainReducer = (state = initialState, action) =>{
    switch(action.type){
        case CHAIN_ADD_BLOCK:
            return {...state, blocks: [...state.blocks, action.payload.block] };
        
        case CHAIN_ADD_CHAIN:
            return {...state, blocks:  [...state.blocks, ...action.payload.blocks]};
        
        default:
            return state;
    }
}