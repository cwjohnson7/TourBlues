import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LineupForm from './lineup-form';
import ListGroup from 'react-bootstrap/ListGroup';

function EventForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <EventCard>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Create an Event</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>Create event</Button>
        </Card.Body>
      </EventCard>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Event Form</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Add events to your Tour! Enter Venue/Address, Artists, and Contact Info.
          <Form>
            <br/>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Venue</Form.Label>
                <Form.Control type="text" placeholder="Venue name" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Venue Contact (Optional)</Form.Label>
                <Form.Control type="text" placeholder="Enter contact name at venue" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Phone (Optional)</Form.Label>
                <Form.Control type="text" placeholder="Phone number (ex. 999-999-9999)" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email (Optional)</Form.Label>
                <Form.Control type="email" placeholder="Venue email" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Venue Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Row>
              <h6>Lineup</h6>
              <hr/>
              <LineupList>
                <ListGroup.Item>Artist 1</ListGroup.Item>
                <ListGroup.Item>Artist 2</ListGroup.Item>
                <ListGroup.Item>Artist 3</ListGroup.Item>
              </LineupList>
            </Row>

            <LineupForm />
            <br />
            <Button variant="primary" type="submit">
              Add Event
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      </>
  );
}

export default EventForm;

const EventCard = styled(Card)`
margin-left: 20px ;
margin-right: 20px ;
`

const LineupList = styled(ListGroup)`
margin-bottom: 20px;`
