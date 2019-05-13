import * as types from './action-types';
export default function reducer(state,action){
    switch(action.type){
        case types.INCREMENT:
          return {number:state.number+1};
        case types.DECREMENT:
          return {number:state.number-1};
        default:
          return state;    
    }
 }