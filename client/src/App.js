import './App.css';

import MainTable from './MainTable';
import AddUserDialog from './AddUserDialog';
import GetUserDialog from './GetUserDialog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [refreshTable, setRefreshTable] = useState(false);
  return (
    <div className="app">
      <div className='container'>
        <ToastContainer />
        <MainTable refreshTable={refreshTable} setRefreshTable={(value) => setRefreshTable(value)}></MainTable>
        <h1>Add user:</h1>
        <AddUserDialog refreshTable={() => setRefreshTable(true)}></AddUserDialog>
        <h1>Get user by id: [1-45]</h1>
        <GetUserDialog></GetUserDialog>
      </div>
      
    </div>
  );
}

export default App;
