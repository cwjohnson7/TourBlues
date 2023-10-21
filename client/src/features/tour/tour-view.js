import { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import LineupForm from '../event/lineup-form';
import LineupUpdate from '../event/lineup-update';
import EventForm from '../event/event-form';

import EventUpdate from '../event/event-update';
import EventDelete from '../event/event-delete';
import LineupDelete from '../event/lineup-delete';

function TourView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tours = useSelector((state) => state.homePage.tours);
  const location = useLocation();
  const path = matchPath('/tours/:tourId', location.pathname);
  const pathId = path.params.tourId;
  const tour = tours.find((element) => element._id === pathId);

  const { events } = tour;
  const tourName = tour.name;
  useEffect(() => {}, [dispatch, tour.events]);
  console.log('tour-view events: ', events);

  const handleHomePageClick = () => {
    navigate('/homepage');
  };

  const renderEventsList = () => {
    if (events) {
      return events.map((event, index) => (
        <Accordion.Item key={event._id} eventKey={event._id}>
          <Accordion.Header>
            {event.venue.name}, Index: {index}
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <h6>Address: </h6>
                {event.venue.address}
                {event.venue.city},
                <div>
                  {event.venue.state} {event.venue.zip}
                </div>
              </Col>
              <Col>
                <h6>Lineup: </h6>
                <ListGroup>
                  {event.lineup.map((artist) => (
                    <ListGroupItem>
                      <InlineItems>
                        {artist.name} ({artist.handle})
                      </InlineItems>
                      <LineupDelete
                        artistId={artist._id}
                        tourId={pathId}
                        eventId={event._id}
                      />
                      <LineupUpdate
                        artistId={artist._id}
                        tourId={pathId}
                        eventId={event._id}
                      />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
              <Col>
                <h6>Date: </h6>
                {event.date}
              </Col>
            </Row>
            <Row>
              <br />
            </Row>

            <Row>
              <Col xs="auto">
                <LineupForm tourId={pathId} eventId={event._id} />
              </Col>
              <Col xs="auto">
                <EventUpdate
                  tourId={pathId}
                  eventId={event._id}
                  venueId={event.venue._id}
                  event={event}
                  venue={event.venue}
                />
              </Col>
              <Col xs="auto">
                <EventDelete eventId={event._id} tourId={pathId} />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ));
    }
  };

  return (
    <EventViewContainer>
      <h3>{tourName}</h3>
      {/* <h5>Events: </h5> */}
      <Row>
        <Col>
          <Accordion>
            <Card>
              <Card.Header>
                <Row>
                  <Col>
                    <h4>Events: </h4>
                  </Col>
                  <Col xs={6} />
                  <Col>
                    <EventForm tourId={pathId} />
                  </Col>
                </Row>
              </Card.Header>
              {renderEventsList()}
              {/* <Accordion.Item eventKey="0">
        <Accordion.Header>Tour Date One</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Tour Date 2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item> */}
            </Card>
          </Accordion>
        </Col>
      </Row>
      <HomePageButton variant="primary" onClick={handleHomePageClick}>
        Back to Homepage
      </HomePageButton>
    </EventViewContainer>
  );
}

export default TourView;

const HomePageButton = styled(Button)`
  margin-top: 20px;
`;

const EventViewContainer = styled(Container)`
  margin-top: 20px;
`;

const InlineItems = styled.div`
  display: inline-block;
`;
// const HeaderButton = styled(Col)`
// justify-content: right;
// `
