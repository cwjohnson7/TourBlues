import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import TourForm from '../tour/tour-form';
import TourUpdate from '../tour/tour-update';
import { getUserToursThunk } from './HomePageSlice';
import TourDelete from '../tour/tour-delete';

function HomePage() {
  const token = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tours = useSelector((state) => state.homePage.tours);

  useEffect(() => {
    dispatch(getUserToursThunk({ token }));
  }, [token, dispatch]);

  const handleTourViewClick = (e) => {
    const tourId = e.currentTarget.id;
    navigate(`/tours/${tourId}`);
  };
  const renderTourList = () => {
    if (tours) {
      return tours.map((tour) => (
        <Accordion.Item key={tour._id} eventKey={tour._id}>
          <Accordion.Header> {tour.name}</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row md={7}>
                <Col>
                  Click 'View Tour Details' to view, add, and update Events for
                  the {tour.name}.
                </Col>
              </Row>
              <br />
            </Container>
            <Row>
              <Col xs="auto">
                <Button
                  id={tour._id}
                  variant="primary"
                  onClick={handleTourViewClick}
                >
                  View Tour Details
                </Button>
              </Col>
              <Col xs="auto">
                <TourUpdate tourId={tour._id} />
              </Col>
              <Col xs="auto">
                <TourDelete tourId={tour._id} />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ));
    }
  };

  return (
    <Container>
      <Container display="flex">
        <Row className="justify-content-md-center">
          <CardCol md={3} />
          <CardCol md={6}>
            <TourForm />
          </CardCol>
          <CardCol md={3} />
        </Row>
      </Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Accordion>
            <Card>
              <Card.Header>
                <h4>Tours</h4>
              </Card.Header>
              {renderTourList()}
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

const CardCol = styled(Col)`
  justify-content: center;
  margin-top: 1%;
  margin-bottom: 1%;
`;
