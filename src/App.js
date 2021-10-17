//import logo from './logo.svg';
import './App.css';
import BioForm from './components/BioForm';
import BioData from './components/BioData';
import  {Container,Row,Col}  from 'react-bootstrap';
import { useState } from 'react';


function App() {
  const [bioData, setBioData] = useState([]);
  const [formStatus, setFormStatus] = useState("new");
  const [singleData, setSingleData] = useState();
  //console.log("App bioData:",bioData,typeof bioData);
  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
            <BioForm 
              setBioData={setBioData} 
              bioData={bioData} 
              formStatus={formStatus} 
              setFormStatus={setFormStatus}
              singleData={singleData}
            />
        </Col>
        <Col sm={12} md={6}>
            <BioData 
              bioData={bioData} 
              setFormStatus={setFormStatus}
              formStatus={formStatus}
              setBioData={setBioData} 
              setSingleData={setSingleData}
            />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
