import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { addTourThunk } from '../homepage/HomePageSlice';

const TourForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authenticated);
  const artistId = useSelector((state) => state.auth.artistId);
  const [tourName, setTourName] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTourName = (e) => {
    e.preventDefault();
    setTourName(e.target.value);
  };
  const handleSubmitForm = () => {
    dispatch(addTourThunk({ data: { name: tourName, artistId }, token }));
    handleClose();
  };

  return (
    <>
      <TourCard>
        <Card.Header>
          <Card.Title>Create a Tour</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Kickoff your tour with the initial details here!
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Create Tour
          </Button>
        </Card.Body>
      </TourCard>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Tour</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="mb-3">
            <Form>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Tour Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tour name"
                  onChange={handleTourName}
                />
              </Form.Group>
              <FormButton
                onClick={handleSubmitForm}
                variant="primary"
                type="button"
              >
                Add Tour
              </FormButton>
            </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TourForm;

const TourCard = styled(Card)`
  height: 200px;
  margin-left: 20px;
  margin-right: 20px;
`;
const FormButton = styled(Button)`
  margin-top: 20px;
`;
