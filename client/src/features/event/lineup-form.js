import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { addLineupArtistThunk } from '../homepage/HomePageSlice';

const initialValues = {
  name: '',
  contact: '',
  email: '',
  handle: '',
  phone: '',
};

function LineupForm({ tourId, eventId }) {
  const dispatch = useDispatch();
  // const tours = useSelector(state => state.homePage.tours);
  const [values, setValues] = useState(initialValues);
  const [show, setShow] = useState(false);
  values.tourId = tourId;
  values.eventId = eventId;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitClick = () => {
    console.log('values from form component: ', values);
    console.log('values from lineup form: ', values);
    dispatch(addLineupArtistThunk(values));
    setValues(initialValues);
    handleClose();
  };

  return (
    <>
      <LineupButton variant="primary" onClick={handleShow}>
        + Add Lineup
      </LineupButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Lineup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Artist Name</Form.Label>
              <Form.Control
                type="text"
                value={values.name}
                name="name"
                onChange={handleInput}
                placeholder="Enter artist name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email (Optional)</Form.Label>
              <Form.Control
                type="email"
                value={values.email}
                name="email"
                onChange={handleInput}
                placeholder="Enter artist email"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Primary Contact (optional)</Form.Label>
              <Form.Control
                type="text"
                value={values.contact}
                name="contact"
                onChange={handleInput}
                placeholder="Enter First/Last Name"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Phone (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={values.phone}
                name="phone"
                onChange={handleInput}
                placeholder="ex. 999-999-9999"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Account Handle (optional)</Form.Label>
              <Form.Control
                type="text"
                value={values.handle}
                name="handle"
                onChange={handleInput}
                placeholder="Enter instagram handle"
              />
            </Form.Group>
            <Col />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmitClick}>
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
`;
LineupForm.propTypes = {
  tourId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
};
