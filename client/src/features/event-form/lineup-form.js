import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';


function LineupForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <LineupButton variant="secondary" onClick={handleShow}>
    + Add Lineup

      </LineupButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Lineup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Artist Name</Form.Label>
                <Form.Control type="text" placeholder="Enter artist name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email (Optional)</Form.Label>
                <Form.Control type="email" placeholder="Enter artist email" />
              </Form.Group>
        </Row>

        <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Primary Contact (optional)</Form.Label>
                <Form.Control type="text" placeholder="Enter First/Last Name" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Phone (Optional)</Form.Label>
                <Form.Control type="text" placeholder="ex. 999-999-9999" />
              </Form.Group>
        </Row>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add to Lineup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LineupForm;

const LineupButton = styled(Button)`
margin-bottom: 10px;
`