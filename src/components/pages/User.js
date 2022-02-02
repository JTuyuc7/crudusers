import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEdit } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import {userDeleteAction} from '../../actions/userActions';
import Swal from 'sweetalert2';

const User = ({user}) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { id, name, username, email } = user;
    //console.log(user);

    const redirectEditUser = (user) => {
        dispatch( getUserEdit(user));
        navigate(`/edituser/${user.id}`);
    }

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "¿Do you really want to delete it?",
            text: "Once deleted it can not be restored",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar' 
        }).then( (res) => {
            if( res.isConfirmed){
                console.log('delete it', user.id);
                dispatch( userDeleteAction(user.id))
            }
        })
    }
    return (  
        <>
                <tr>
                    <td><span className='font-weight-bold'>{id}</span></td>
                    <td>{name}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{user?.address?.city}</td>
                    <td className='acciones'>
                        <button
                            type='button'
                            className='btn btn-primary mr-3'
                            onClick={ () => redirectEditUser(user)}
                        >
                            Editar
                        </button>

                        <button
                            type='button'
                            className='btn btn-danger'
                            onClick={ () => handleDeleteUser(user)}
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
        </>
    );
}

export default User;