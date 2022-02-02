// Types

import{
    SHOW_ALERT,
    HIDE_ALERT
}from '../types';

export function showAlert(status){
    
    return (dispatch) => {
        dispatch(createAlert(status))
        
    }
};

const createAlert = (status) => {
    return {
        type: SHOW_ALERT,
        payload: status
    }
};
