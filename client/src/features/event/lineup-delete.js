import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLineupArtistThunk } from '../homepage/HomePageSlice';

function LineupDelete({ artistId, tourId, eventId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authenticated);
  const currentArtistId = useSelector((state) => state.auth.artistId);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (currentArtistId !== artistId) {
      return setShow(true);
    }
    return alert('Cannot delete your own artist');
  };
  const handleSubmitClick = () => {
    if (currentArtistId !== artistId) {
      dispatch(
        deleteLineupArtistThunk({ data: { eventId, tourId, artistId }, token })
      );
      handleClose();
      return;
    }
    return alert('Cannot delete your own artist');
  };

  return (
    <>
      <DeleteButton variant="outline-danger" size="sm" onClick={handleShow}>
        X
      </DeleteButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Artist From Lineup</Modal.Title>
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

export default LineupDelete;

const DeleteButton = styled(Button)`
  float: right;
  margin-left: 5px;
`;

LineupDelete.propTypes = {
  eventId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  tourId: PropTypes.string.isRequired,
};
