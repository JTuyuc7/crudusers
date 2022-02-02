// Types
import{
    SHOW_ALERT,
    HIDE_ALERT
} from '../types';

const initialState = {
    alert: null,
    active: null
};

export default function (state = initialState, action){

    switch(action.type){
        case SHOW_ALERT:
            return {
                ...state,
                active: action.payload,
            }
        default:
            return state;
    }
}