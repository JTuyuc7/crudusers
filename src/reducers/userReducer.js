// Impor the types
import {
    START_DOWNLOAD_USERS,
    DOWNLOAD_USERS_ERROR,
    DOWNLOAD_USERS_SUCCESS,

    ADD_NEW_USER,
    ADD_USER_ERROR,
    ADD_USER_SUCCESS,

    GET_USER_INFO_EDIT,

    EDIT_USER_DATA,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,

    USER_INFO_DELETE,
    USER_DELETED_SUCCESS,
    USER_DELETED_ERROR

} from '../types';


const initialState = {
    users: [],
    loading: null,
    msgError: null,
    editUser: null,
    deleteUser: null
}

export default function (state = initialState, action){

    switch(action.type){
        case START_DOWNLOAD_USERS:
            return {
                ...state,
                loading: true
            }
        
        case DOWNLOAD_USERS_SUCCESS:
            return {
                ...state,
                loading: null,
                users: action.payload
            }
        case DOWNLOAD_USERS_ERROR:
            return {
                ...state,
                msgError: true
            }

        case ADD_NEW_USER:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: null,
                users: [ action.payload, ...state.users]
            }
        case ADD_USER_ERROR:
        case EDIT_USER_ERROR:
            return {
                ...state,
                msgError: action.payload
            }
        case GET_USER_INFO_EDIT:
            return {
                ...state,
                editUser: action.payload
            }
        case EDIT_USER_DATA:
            return {
                ...state,
                loading: true,
            }
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: null,
                users: state.users.map( (user) => user.id === action.payload.id ? user = action.payload : user ),
            }
        case USER_INFO_DELETE:
            return{
                ...state,
                deleteUser: action.payload,
                loading: true,
            }
        case USER_DELETED_SUCCESS:
            return {
                ...state,
                deleteUser: null,
                loading: null,
                users: state.users.filter( (user) => user.id !== state.deleteUser),
            }
        case USER_DELETED_ERROR:
            return{
                ...state,
                msgError: action.payload
            }
        default:
            return state;
    }
}