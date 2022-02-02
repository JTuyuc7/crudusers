import React from 'react';
import Header from './components/pages/Header';
import AddUser from './components/pages/AddUser';
import EditUser from './components/pages/EditUser';
import Users from './components/pages/Users';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
//import { BrowserRouter, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider} from 'react-redux';
import store from './store';

const App = () => {

  return (  
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <div className='container mt-5'>
            <Routes>
              <Route path="/" element={ <Users/>} />
              <Route path="/adduser" element={ <AddUser />} />
              <Route path="/edituser/:id" element={ <EditUser />} />
            </Routes>
          </div>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

// json-server db.json --port 4005 to run locally