import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Panel from './components/panel/panel';
import Form from 'react-bootstrap/Form';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MultiPanel from './components/multiPanel/multiPanel';

function App() {
  const history = useNavigate();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    history(`/${selectedValue}`);
  };
  
  return (
    <Container fluid="md" className="mt-3">
      <Col>
        <Form.Select aria-label="Default select example" onChange={handleSelectChange}>
          <option key="single" value="single">
            Single
          </option>
          <option key="compare" value="compare">
            Compare
          </option>
        </Form.Select>
      </Col>
      <Routes>
        <Route path="/single" element={<Panel isShowOrder={true} name="single"/>}/>
        <Route path="/compare" element={<MultiPanel/>}/>
      </Routes>

      {/*<Panel className="mt-3"/>*/}
    </Container>
  );
}

export default App;
