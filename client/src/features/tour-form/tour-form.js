import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function TourForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <TourCard>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Create a Tour</Card.Title>
          <Card.Text>
            Kickoff your tour with the initial details here!
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>Create Tour</Button>
        </Card.Body>
      </TourCard>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Tour Name</Form.Label>
              <Form.Control type="text" placeholder="Enter tour name" />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Tour
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TourForm;

const TourCard = styled(Card)`
margin-left: 20px;
margin-right: 20px;
`