import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserAction } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const dispatch = useDispatch();
    let navigation = useNavigate();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ city, setCity ] = useState('');
    const [ nameAlert, setNameAlert] = useState(null);
    const [ emailA, setEmailA ] = useState(null);
    const [ cityA, setCityA ] = useState(null);
    const users = useSelector( (state) => state.user.users);
    const addNewUser = (user) => dispatch( addNewUserAction(user));

    const submitNewUser = (e) => {
        e.preventDefault();
        if( name.trim() === ''){
            setNameAlert(true)
            setTimeout(() => {
                setNameAlert(null)
            }, 1500)
            return;
        }else if( name.trim() !== ''){
            setNameAlert(false)
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

        if( city.trim() === ''){
            setCityA(true)
            setTimeout(() => {
                setCityA(null)
            }, 1500)
            return;
        }else if( city.trim() !== ''){
            setCityA(false)
        }
        
        let r = (Math.random() + 1).toString(36).substring(7);
        const newUser = { address:{} };
        newUser.id = users.length + 1 || (Math.random() + 1).toFixed(3);
        newUser.name = name;
        newUser.email = email;
        newUser['address'].city = city;
        newUser.username = name+r;
        addNewUser(newUser)
        
        // Redirigir 
        navigation('/');
    }

    return (  
        <>
            <div className='row justify-content-center'>
                <div className='col-md-8 mt-4'>
                    { nameAlert || emailA || cityA ? (
                        <div className="alert alert-dismissible alert-danger">
                            <strong>Complete all the fields</strong>
                        </div>
                    ): null}
                    <div className='card'>
                        <div className='card-body mt-4'>
                            <h2 className='text-center mb-4 font-weight-bold'>
                                Add New User
                            </h2>
                            <form
                                onSubmit={submitNewUser}
                            >
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input
                                        className={`form-control ${nameAlert ? 'is-invalid' : nameAlert === null ? '' : 'is-valid'} `}
                                        placeholder='User Name'
                                        type="text"
                                        value={name}
                                        onChange={ e => setName(e.target.value )}
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
                                        onChange={ e => setEmail(e.target.value)}
                                    />
                                    <div className="invalid-feedback">{email === '' ? 'Email is required' : emailA ? 'Must be a valid email' : '' }</div>
                                </div>
                                {/*<div className="form-group has-danger">
                                    <label className="form-label mt-4" htmlFor="inputInvalid">Invalid input</label>
                                    <input typeNclassName="text" value="wrong value" class="form-control is-invalid" id="inputInvalid"/>
                                    <div className="invalid-feedback">Sorry, that username's taken. Try another?</div>
    </div>*/}
                                <div className='form-group'>
                                    <label htmlFor='inputValid'>City</label>
                                    <input 
                                        className={`form-control ${cityA ? 'is-invalid' : cityA === null ? '' : 'is-valid'} `}
                                        placeholder='User City'
                                        type="text"
                                        value={city}
                                        onChange={ e => setCity(e.target.value)}
                                    />
                                    <div className="invalid-feedback">City is Required</div>
                                </div>
                                <div className='form-group mt-5'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                        Add User
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

export default AddUser;