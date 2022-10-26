import './App.css';

import MainTable from './MainTable';
import AddUserDialog from './AddUserDialog';
import GetUserDialog from './GetUserDialog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [userAdded, setUserAdded] = useState(0);
  return (
    <div className="app">
      <div className='container'>
        <ToastContainer />
        <MainTable userAdded={userAdded}></MainTable>
        <br/>
        <h3>Add user:</h3>
        <AddUserDialog setUserAdded={() => setUserAdded(userAdded + 1)}></AddUserDialog>
        <br/>
        <h3>Get user by id:</h3>
        <GetUserDialog></GetUserDialog>
      </div>
      
    </div>
  );
}

export default App;
