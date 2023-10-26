import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteTourThunk } from '../homepage/HomePageSlice';

const TourDelete = ({ tourId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authenticated);
  const artistId = useSelector((state) => state.auth.artistId);
  const tours = useSelector((state) => state.homePage.tours);
  const tour = tours.find((element) => element._id === tourId);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitClick = () => {
    if (tour.events.length > 0) {
      return alert(
        'Events still present. Please remove all events from this tour before deleting the tour.'
      );
    }
    dispatch(deleteTourThunk({ data: { tourId, artistId }, token }));
    handleClose();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Tour
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Tour</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmitClick} variant="primary" type="button">
            Remove
          </Button>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TourDelete;

TourDelete.propTypes = {
  tourId: PropTypes.string.isRequired,
};
