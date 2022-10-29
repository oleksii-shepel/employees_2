import './App.css';

import MainTable from './MainTable';
import AddUserDialog from './AddUserDialog';
import GetUserDialog from './GetUserDialog';
import { ToastContainer } from 'react-toastify';
import { TableContextProvider } from './TableContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <div className="app">
      <div className='container'>
        <ToastContainer />
        <TableContextProvider>
          <MainTable></MainTable>
          <br/>
          <h3>Add user:</h3>
          <AddUserDialog></AddUserDialog>
          <br/>
        </TableContextProvider>
        <h3>Get user by id:</h3>
        <GetUserDialog></GetUserDialog>
      </div>
      
    </div>
  );
}

export default App;
