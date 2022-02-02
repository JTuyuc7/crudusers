import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserEdit, editUserAction } from '../../actions/userActions';

const EditUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector( (state) => state.user.editUser);
    // Edita state
    const [ address, setAdress ] = useState(userInfo.address.city)
    const [ user, saveUserInfo] = useState({
        name: '',
        email: '',
        
    });

    // Validations
    const [ nameA, setNameA ] = useState(null);
    const [ emailA, setEmailA ] = useState(null);
    const [ cityA, setCityA ] = useState(null);
    
    const { name, email } = user;
    //const { city } = user.address;
    
    useEffect(() => {
        saveUserInfo(userInfo)
    },[userInfo]);

    const onChangeForm = (e) => {
        saveUserInfo({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const cancelEditiion = () => {
        dispatch( getUserEdit(null));
        navigate('/');
    }

    const handleEditUser = (e) => {
        e.preventDefault();

        if( name.trim() === ''){
            setNameA(true)
            setTimeout(() => {
                setNameA(null)
            }, 1500)
            return;
        }else if( name.trim() !== ''){
            setNameA(false)
        }

        if( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
            setEmailA(true);
            setTimeout(() => {
                setEmailA(null)
            }, 2000)
            return;
        }else {
            setEmailA(false);
        }

        if( address.trim() === ''){
            setCityA(true)
            setTimeout(() => {
                setCityA(null)
            }, 1500)
            return;
        }else if( address.trim() !== ''){
            setCityA(false)
        }
        let r = (Math.random() + 1).toString(36).substring(7);
        let userEdited = { address: {}};
        userEdited.id = userInfo.id;
        userEdited.username = name+r;
        userEdited.name = name;
        userEdited.email = email;
        userEdited.address.city = address;

        //console.log(userEdited, 'new obj edited')
        dispatch(editUserAction(userEdited));
        navigate('/')
    }

    return (  
        <>
            <div className='row justify-content-center'>
                <div className='col-md-8 mt-4'>
                    { nameA || emailA || cityA ? (
                        <div className="alert alert-dismissible alert-danger">
                            <strong>Complete all the fields</strong>
                        </div>
                    ): null}
                    <div className='card'>
                        <div className='card-body mt-4'>
                            <h2 className='text-center mb-4 font-weight-bold'>
                                Edit User
                            </h2>

                            <form 
                                onSubmit={handleEditUser}
                            >
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input 
                                        className={`form-control ${nameA ? 'is-invalid' : nameA === null ? '' : 'is-valid'} `}
                                        placeholder='User Name'
                                        type="text"
                                        value={name}
                                        name="name"
                                        onChange={ onChangeForm }
                                    />
                                    <div className="invalid-feedback">Name is Required</div>
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input 
                                        className={`form-control ${emailA ? 'is-invalid' : emailA === null ? '' : 'is-valid'} `}
                                        placeholder='User Email'
                                        type="text"
                                        value={email}
                                        name="email"
                                        onChange={ onChangeForm }
                                    />
                                    <div className="invalid-feedback">Email is Required</div>
                                </div>
                                <div className='form-group'>
                                    <label>City</label>
                                    <input 
                                        className={`form-control ${cityA ? 'is-invalid' : cityA === null ? '' : 'is-valid'} `}
                                        placeholder='User City'
                                        type="text"
                                        value={address}
                                        name="address"
                                        onChange={ (e) => setAdress(e.target.value) }
                                    />
                                    <div className="invalid-feedback">City is required</div>
                                </div>
                                <div className='form-group d-flex justify-content-between mt-5'>
                                    <button
                                        onClick={ () => cancelEditiion() }
                                        type='submit'
                                        className='btn btn-danger font-weight-bold text-uppercase w-auto px-5'>
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className='btn btn-primary font-weight-bold text-uppercase w-auto px-5'>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditUser;