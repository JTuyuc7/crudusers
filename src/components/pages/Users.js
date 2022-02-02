import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllUsersActions } from '../../actions/userActions';
import User from './User';

const Users = () => {

    const dispatch = useDispatch();
    const [ search, setSearch ] = useState('');

    useEffect(() => {
        const usersData = () => dispatch( getAllUsersActions());
        usersData();
    },[]);

    const usersArray = useSelector( (state) => state?.user?.users);

    let data = usersArray?.filter( (ele) => {
        return ele.name.toLowerCase().indexOf( search.toLowerCase()) > -1;
    });

    return (  
        <>
            <div className='mb-5'>
                <h2
                    className='text-center my-3'
                > List Of Users</h2>

                <div className='py-3'>
                    <form className="d-flex">
                        <input 
                            className="form-control me-sm-2" 
                            type="text" 
                            placeholder="Search for user"
                            value={search}
                            onChange={ (e) => setSearch(e.target.value)}
                        />
                        {/*<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>*/}
                    </form>
                </div>
                <table className='table table-striped'>
                    <thead className='bg-primary table-dark'>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>NAME</th>
                            <th scope='col'>USERNAME</th>
                            <th scope='col'>EMAIL</th>
                            <th scope='col'>CITY</th>
                            <th scope='col'>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        { usersArray.length === 0 ? (
                            <tr>
                                <th>No Users Found</th>
                            </tr>
                        ) : (
                            data?.map( (indUser) => {
                                //console.log(indUser, 'here');
                                return(
                                    <User
                                        key={indUser.id}
                                        user={indUser}
                                    />
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
 
export default Users;