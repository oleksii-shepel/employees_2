import './App.css';
import MainTable from './MainTable';
import AddUserDialog from './AddUserDialog';
import GetUserDialog from './GetUserDialog';
import { ToastContainer } from 'react-toastify';
import { TableContextProvider } from './TableContext';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <Container>
      <ToastContainer />
      <TableContextProvider>
        <h3>Main table</h3>
        <MainTable></MainTable>
        <br />
        <h3>Add user</h3>
        <AddUserDialog></AddUserDialog>
        <br />
      </TableContextProvider>
      <h3>Get user by id</h3>
      <GetUserDialog></GetUserDialog>
    </Container>
  );
}

export default App;
