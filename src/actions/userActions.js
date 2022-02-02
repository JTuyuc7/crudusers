// Import the Types
import{
    START_DOWNLOAD_USERS,
    DOWNLOAD_USERS_SUCCESS,
    DOWNLOAD_USERS_ERROR,

    ADD_NEW_USER,
    ADD_USER_ERROR,
    ADD_USER_SUCCESS,

    GET_USER_INFO_EDIT,

    EDIT_USER_DATA,
    EDIT_USER_ERROR,
    EDIT_USER_SUCCESS,

    USER_INFO_DELETE,
    USER_DELETED_ERROR,
    USER_DELETED_SUCCESS
} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

export function getAllUsersActions(){

    return async (dispatch) => {
        dispatch(downloadUsers());

        try {
            const res = await axiosClient.get('/data');
            //console.log(res.data,'data *-*-*--*-*-');
            dispatch(downloadSuccess(res.data))
        } catch (error) {
            console.log(error);
            dispatch(downloadUsersError());
        }
    }
}
const downloadUsers = () => ({
    type: START_DOWNLOAD_USERS,
    payload: true
});
const downloadSuccess = (data) => ({
    type: DOWNLOAD_USERS_SUCCESS,
    payload: data
});
const downloadUsersError = () => ({
    type: DOWNLOAD_USERS_ERROR,
    payload: true,
});

//ADD NEW USER
export function addNewUserAction( user ){
    return async (dispatch) => {
        dispatch( starAddingUser());
        try {
            let result = await axiosClient.post('/data', user)
            //console.log(result.data, 'new response?');
            dispatch( userAddedSuccess(result.data));

            Swal.fire(
                "Great",
                "User added successfully",
                "success"
            )
        } catch (error) {
            console.log(error);
            dispatch(userAddedError('Unable to save the user'))
        }
    }
}
const starAddingUser = () => ({
    type: ADD_NEW_USER,
    payload: true,
});
const userAddedSuccess = (user) => ({
    type: ADD_USER_SUCCESS,
    payload: user
});
const userAddedError = (msg) => ({
    type: ADD_USER_ERROR,
    payload: msg
})

// Get user info edit
export function getUserEdit(user){
    return(dispatch) => {
        dispatch( getUserEditInfo(user))
    }
}
const getUserEditInfo = (user) => ({
    type: GET_USER_INFO_EDIT,
    payload: user
});

// Edit user Info
export function editUserAction(user){
    return async (dispatch) => {
        dispatch(startUserEdit());
        try {
            let result = await axiosClient.put(`/data/${user.id}`, user);
            dispatch(userUpdatedSuccess(result.data))
            Swal.fire(
                "Success",
                "User edited successfully",
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( userEditedError('Unable to Edit the user'))
        }
    }
}
const startUserEdit = () => ({
    type: EDIT_USER_DATA,
    payload: true
});
const userUpdatedSuccess = (data) => ({
    type: EDIT_USER_SUCCESS,
    payload: data,
});
const userEditedError = (msg) => ({
    type: EDIT_USER_ERROR,
    payload: msg
});

// Delete user
export function userDeleteAction(id) {
    console.log(id, 'desde el action');
    return async (dispatch) => {
        dispatch(startGettingInfo(id));
        try {
            await axiosClient.delete(`/data/${id}`);
            dispatch( userDeletedSuccess())
        } catch (error) {
            console.log(error);
            dispatch( userDeletedError('Unable to remove the user'));
        }
    }
}
const startGettingInfo = (id) => ({
    type: USER_INFO_DELETE,
    payload: id,
});
const userDeletedSuccess = () => ({
    type: USER_DELETED_SUCCESS,
});
const userDeletedError = (msg) => ({
    type: USER_DELETED_ERROR,
    payload: msg
})