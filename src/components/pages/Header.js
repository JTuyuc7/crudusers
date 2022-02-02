import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (  
        <>
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between'>
                <div className='container'>
                    <h1 className='text-uppercase'> <Link to={'/'} className='text-light'>Users - CRUD</Link> </h1>
                </div>
                <Link
                    className="btn btn-danger nuevo-post d-block d-md-inline-block"
                    to={'/adduser'}>Add New User &#43;</Link>
            </nav>
        </>
    );
}

export default Header;