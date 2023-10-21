import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteEventThunk } from '../homepage/HomePageSlice';

function EventDelete({ eventId }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitClick = () => {
    dispatch(deleteEventThunk({ data: { eventId } }));
    handleClose();
  };

  return (
    <>
      <DeleteButton variant="danger" onClick={handleShow}>
        Delete event
      </DeleteButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmitClick}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventDelete;

const DeleteButton = styled(Button)`
  float: right;
`;
EventDelete.propTypes = {
  eventId: PropTypes.string.isRequired,
};
