import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { updateLineupArtistThunk } from '../homepage/HomePageSlice';

function LineupUpdate({ artistId, tourId, eventId }) {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.homePage.tours);
  const tour = tours.find((element) => element._id === tourId);
  const event = tour.events.find((element) => element._id === eventId);
  const lineupArtist = event.lineup.find((element) => element._id === artistId);

  // const tours = useSelector(state => state.homePage.tours);
  const initialValues = {
    newName: lineupArtist.name,
    newContact: lineupArtist.contact,
    newEmail: lineupArtist.email,
    newHandle: lineupArtist.handle,
    newPhone: lineupArtist.phone,
  };
  const [values, setValues] = useState(initialValues);
  const [show, setShow] = useState(false);
  values.tourId = tourId;
  values.eventId = eventId;
  values.artistId = artistId;
  useEffect(() => {}, [dispatch, event.lineup]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleCloseClick = () => {
    setValues(initialValues);
    handleClose();
  };
  const handleSubmitClick = () => {
    dispatch(updateLineupArtistThunk(values));
    setValues(initialValues);
    handleClose();
  };

  return (
    <>
      <LineupButton variant="primary" size="sm" onClick={handleShow}>
        Edit
      </LineupButton>

      <Modal show={show} onHide={handleCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Lineup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Artist Name</Form.Label>
              <Form.Control
                type="text"
                value={values.newName}
                name="newName"
                onChange={handleInput}
                placeholder="Enter artist name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email (Optional)</Form.Label>
              <Form.Control
                type="email"
                value={values.newEmail}
                name="newEmail"
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
                value={values.newContact}
                name="newContact"
                onChange={handleInput}
                placeholder="Enter First/Last Name"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Phone (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={values.newPhone}
                name="newPhone"
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
                value={values.newHandle}
                name="newHandle"
                onChange={handleInput}
                placeholder="Enter instagram handle"
              />
            </Form.Group>
            <Col />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleCloseClick}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmitClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LineupUpdate;

const LineupButton = styled(Button)`
  float: right;
`;
LineupUpdate.propTypes = {
  artistId: PropTypes.string.isRequired,
  tourId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
};
