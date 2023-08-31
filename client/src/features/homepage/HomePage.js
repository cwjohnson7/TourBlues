import EventForm from "../event-form/event-form";
import Accordion from "react-bootstrap/Accordion"
import Container from 'react-bootstrap/Container';
import TourForm from "../tour-form/tour-form";
import FinanceDashboard from "../finance-dashboard/fin-dashboard";
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";


function HomePage () {
  const navigate = useNavigate();

  const handleTourViewClick = () => {
    navigate("/tours");
  }
  const renderTourList = () => {
    return(
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header> Tour A</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <br />
          <Button variant="primary" onClick={handleTourViewClick}>View Tour Details</Button>
        </Accordion.Body>
        
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Tour B</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <br />
          <Button variant="primary" onClick={handleTourViewClick}>View Tour Details</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    )
  }


  return(
    <Container>
      <Row>
        <CardCol>
          <ActionsContainer>
            <TourForm />
          </ActionsContainer>
        </CardCol>
        <CardCol>
        <ActionsContainer>
          <EventForm />
        </ActionsContainer>
        </CardCol>
        <CardCol>
          <ActionsContainer>
            <FinanceDashboard />
          </ActionsContainer>
        </CardCol>
      </Row>
      <Row>
        <Col>{renderTourList()}</Col>
      </Row>
      </Container>
  )
}

export default HomePage;

const ActionsContainer = styled(Container)`
margin-top: 8%;
margin-bottom: 8%;
`



const CardCol = styled(Col)`
justify-content: center;`