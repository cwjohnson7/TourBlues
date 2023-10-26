import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bootstrap from 'bootstrap';
import '../../app/App.css';
import ReactPaginate from 'react-paginate';
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
import {
  addEventThunk,
  closeEventForm,
  getVenueQueryThunk,
} from './event-formSlice';

const initialValues = {
  venueName: '',
  date: '',
  doors: '',
  setLength: '',
  contact: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

const Venues = ({ currentItems }) => (
  <div className="items">
    {currentItems &&
      currentItems.map((venue) => (
        <ListGroup.Item
          as="li"
          key={venue.key}
          className="d-flex justify-content-between align-items-start"
          data-bs-theme="dark"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{venue.name}</div>
            <div className="ms-2 me-auto">{venue.address}</div>
            <div className="fw-bold">Rating (Out of 5): {venue.rating}</div>
          </div>
        </ListGroup.Item>
      ))}
  </div>
);

function EventForm({ tourId, itemsPerPage }) {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.eventForm.venues);
  const token = useSelector((state) => state.auth.authenticated);
  const artistId = useSelector((state) => state.auth.artistId);
  const [values, setValues] = useState(initialValues);
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  values.artistId = artistId;
  values.tourId = tourId;
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

  const handleSubmitClick = () => {
    console.log('values from form component: ', values);
    dispatch(addEventThunk({ data: values, token }));
    setValues(initialValues);
    handleClose();
  };

  const handleVenueSearch = () => {
    dispatch(getVenueQueryThunk({ data: { query }, token }));
    console.log('data from submit: ', query);
  };

  // pagination  variables
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // const itemsPerPage = 4;
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log('Venue data: ', venues);
    setCurrentItems(venues.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(venues.length / itemsPerPage));
  }, [itemOffset, venues, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % venues.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleCloseClick = () => {
    dispatch(closeEventForm());
    setCurrentItems([]);
    handleClose();
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
      <Button variant="primary" onClick={handleShow}>
        Add event
      </Button>
      {/* </Card.Body>
      </EventCard> */}
      {/* </Container> */}
      <Offcanvas show={show} onHide={handleCloseClick} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Event Form</Offcanvas.Title>
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
                <Venues currentItems={currentItems} />
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                  pageLinkClassName="page-num"
                  previousLinkClassName="page-num"
                  nextLinkClassName="page-num"
                  activeLinkClassName="active"
                />
              </SearchResults>
            </Row>
            <Row />
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
                  value={values.venueName}
                  name="venueName"
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
                  value={values.date}
                  name="date"
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
                  value={values.doors}
                  name="doors"
                  onChange={handleInput}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Set Length</Form.Label>
                <Form.Control
                  type="text"
                  value={values.setLength}
                  name="setLength"
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
                  value={values.contact}
                  name="contact"
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
                  value={values.phone}
                  name="phone"
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
                  value={values.email}
                  name="email"
                  onChange={handleInput}
                  placeholder="Venue email"
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Venue Address</Form.Label>
              <Form.Control
                type="text"
                value={values.address}
                name="address"
                onChange={handleInput}
                placeholder="1234 Main St"
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={values.city}
                  name="city"
                  onChange={handleInput}
                  placeholder="City"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  aria-label="Choose..."
                  value={values.state}
                  name="state"
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
                  value={values.zip}
                  name="zip"
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
              Add Event
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default EventForm;

// const EventCard = styled(Card)`
// margin-left: 20px ;
// margin-right: 20px ;
// width: 80%
// `

const SearchResults = styled(ListGroup)`
  height: 250px;
  overflow-y: scroll;
`;

EventForm.propTypes = {
  tourId: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
Venues.propTypes = {
  currentItems: PropTypes.array.isRequired,
};
