import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { updateTourThunk } from '../homepage/HomePageSlice';

const TourUpdate = ({ tourId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authenticated);
  const tours = useSelector((state) => state.homePage.tours);
  const tour = tours.find((element) => element._id === tourId);
  const initialValues = {
    newName: tour.name,
  };
  const [values, setValues] = useState(initialValues);
  const [show, setShow] = useState(false);
  values.tourId = tourId;
  useEffect(() => {}, [dispatch, tours]);
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
    dispatch(updateTourThunk({ data: values, token }));
    handleClose();
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update Tour
      </Button>
      <Modal show={show} onHide={handleCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Update Tour</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="mb-3">
            <Form>
              <Form.Group as={Col}>
                <Form.Label>Tour Name</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newName}
                  name="newName"
                  placeholder="Enter tour name"
                  onChange={handleInput}
                />
              </Form.Group>
            </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmitClick} variant="primary" type="button">
            Update Tour
          </Button>
          <Button variant="secondary" type="button" onClick={handleCloseClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TourUpdate;

TourUpdate.propTypes = {
  tourId: PropTypes.string.isRequired,
};
