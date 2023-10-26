import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import LineupForm from './lineup-form';
import ListGroup from 'react-bootstrap/ListGroup';
import STATES from '../../utilities/states';
import { updateEventThunk, getVenueQueryThunk } from './event-formSlice';

function EventUpdate({ tourId, eventId, venueId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authenticated);
  const artistId = useSelector((state) => state.auth.artistId);
  const venues = useSelector((state) => state.eventForm.venues);
  const tours = useSelector((state) => state.homePage.tours);
  const tour = tours.find((element) => element._id === tourId);
  const event = tour.events.find((element) => element._id === eventId);
  const initialValues = {
    newVenueName: event.venue.name,
    newDate: event.date,
    newDoors: event.doors,
    newSetLength: event.setLength,
    newContact: event.venue.contact,
    newPhone: event.venue.phone,
    newEmail: event.venue.email,
    newAddress: event.venue.address,
    newCity: event.venue.city,
    newState: event.venue.state,
    newZip: event.venue.zip,
    artistId,
  };

  const [values, setValues] = useState(initialValues);
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  values.tourId = tourId;
  values.eventId = eventId;
  values.venueId = venueId;
  useEffect(() => {}, [dispatch, tour.events]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

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
    dispatch(updateEventThunk({ data: values, token }));

    handleClose();
  };

  const handleVenueSearch = () => {
    // dispatch(getVenueQueryThunk({ query }));
    dispatch(getVenueQueryThunk({ data: { query }, token }));
    console.log('data from submit: ', query);
  };

  const renderVenueQuery = () => {
    if (venues) {
      return venues.map((venue) => (
        <ListGroup.Item
          as="li"
          key={venue.place_id}
          className="d-flex justify-content-between align-items-start"
          data-bs-theme="dark"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{venue.name}</div>
            {venue.formatted_address}
          </div>
        </ListGroup.Item>
      ));
    }
  };

  return (
    <>
      {/* <Container> */}
      {/* <EventCard>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Add Events to the Tour</Card.Title>
          <Card.Text>
            Enter Venue, Dates and Lineup information to keep track of each event on the tour.
          </Card.Text> */}
      <Button variant="warning" onClick={handleShow}>
        Update event
      </Button>
      {/* </Card.Body>
      </EventCard> */}
      {/* </Container> */}
      <Offcanvas show={show} onHide={handleCloseClick} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update Event</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row className="mb-3">
              <Form.Label>Venue Search</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  onChange={handleQuery}
                  placeholder="Search Venues"
                />
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={handleVenueSearch}>
                  Search
                </Button>
              </Col>
            </Row>
            <Row>
              <SearchResults variant="flush" overflow-y="scroll">
                {renderVenueQuery()}
              </SearchResults>
            </Row>
            <hr />
            <h6>
              Add events to your Tour! Enter Venue/Address, Artists, and Contact
              info. below.
            </h6>
            <hr />
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newVenueName}
                  name="newVenueName"
                  onChange={handleInput}
                  placeholder="Venue name"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newDate}
                  name="newDate"
                  onChange={handleInput}
                  placeholder="DD/MM/YYYY"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Doors Time</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newDoors}
                  name="newDoors"
                  onChange={handleInput}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Set Length</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newSetLength}
                  name="newSetLength"
                  onChange={handleInput}
                  placeholder="Enter set length"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Venue Contact (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newContact}
                  name="newContact"
                  onChange={handleInput}
                  placeholder="Enter contact name at venue"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Phone (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newPhone}
                  name="newPhone"
                  onChange={handleInput}
                  placeholder="Phone number (ex. 999-999-9999)"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email (Optional)</Form.Label>
                <Form.Control
                  type="email"
                  value={values.newEmail}
                  name="newEmail"
                  onChange={handleInput}
                  placeholder="Venue email"
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Venue Address</Form.Label>
              <Form.Control
                type="text"
                value={values.newAddress}
                name="newAddress"
                onChange={handleInput}
                placeholder="1234 Main St"
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newCity}
                  name="newCity"
                  onChange={handleInput}
                  placeholder="City"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  aria-label="Choose..."
                  value={values.newState}
                  name="newState"
                  onChange={handleInput}
                >
                  <option>Choose...</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  value={values.newZip}
                  name="newZip"
                  onChange={handleInput}
                  placeholder="Zip"
                />
              </Form.Group>
            </Row>

            <Row>
              {/* <Col xs="auto">
            <LineupForm />
            </Col> */}
            </Row>
            <Button variant="primary" type="button" onClick={handleSubmitClick}>
              Update Event
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default EventUpdate;

// const EventCard = styled(Card)`
// margin-left: 20px ;
// margin-right: 20px ;
// width: 80%
// `

const SearchResults = styled(ListGroup)`
  height: 250px;
  overflow-y: scroll;
`;

EventUpdate.propTypes = {
  tourId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  venueId: PropTypes.string.isRequired,
};
