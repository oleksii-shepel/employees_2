import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { useContext } from 'react';
import './App.css';
import { TableContext } from './TableContext';

function TableHeader() {
  const table = useContext(TableContext);

  return (
    <Row>
      <Form.Group as={Col} className="mb-3" xs={4}>
        <Form.Label htmlFor="currentPageInput">
          Current page
        </Form.Label>
        <InputGroup id="currentPageInput">
          <Button variant="outline-secondary" onClick={() => {
            table.setCurrentPage(table.currentPage <= 1 ? 1 : table.currentPage - 1);
          }}>
            &#10216;&#10216;
          </Button>
          <Form.Control type="number" value={table.currentPage} onChange={(event) => {
            let value = +event.target.value;
            value = value <= 0 ? 1 : value;
            value = value <= table.totalPages() ? value : table.totalPages();
            table.setCurrentPage(value);
          }} />
          <Button variant="outline-secondary" onClick={() => {
            table.setCurrentPage(table.currentPage < table.totalPages() ? table.currentPage + 1 : table.currentPage);
          }}>
            &#10217;&#10217;
          </Button>
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" xs={4}>
        <Form.Label htmlFor="perPageInput">
          Per page
        </Form.Label>
        <Form.Control id="perPageInput" type="number" value={table.perPage} onChange={(event) => { table.setPerPage(+event.target.value); }} />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" xs={4}>
        <Form.Label htmlFor="offsetInput">
          Offset
        </Form.Label>
        <Form.Control id="offsetInput" type="number" value={table.offset} onChange={(event) => { table.setOffset(+event.target.value); }} />
      </Form.Group>
    </Row>
  );
}

export default TableHeader;
