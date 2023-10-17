import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FinanceDashboard from '../finance-dashboard/fin-dashboard';
import TourForm from '../tour/tour-form';
import EventForm from '../event/event-form';
import { getUserToursThunk } from './HomePageSlice';

function HomePage() {
  const { token } = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tours = useSelector((state) => state.homePage.tours);
  // const location = useLocation();
  // const path = matchPath("/tours/:tourId", location.pathname);
  // const pathId = path.params.tourId;
  // const tour = tours.find(tour => tour._id === pathId);
  const artistId = '64f92397aa11269c12b9c746';

  useEffect(() => {
    dispatch(getUserToursThunk({ artistId }));
  }, [token, artistId, dispatch]);

  const handleTourViewClick = (e) => {
    const tourId = e.currentTarget.id;
    // console.log('e.currentTarget.id ', e.currentTarget.id)
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
              {/* <Row md={7} className="justify-content-center"> */}
              {/* <CardCol> */}
              {/* <ActionsContainer> */}

              {/* </ActionsContainer> */}
              {/* </CardCol> */}
              {/* </Row> */}
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
              {/* <Col xs="auto"><EventForm /></Col> */}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ));
    }

    // return(
    //   <Accordion>
    //   <Accordion.Item eventKey="0">
    //     <Accordion.Header> {tours[0].name}</Accordion.Header>
    //     <Accordion.Body>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //       aliquip ex ea commodo consequat. Duis aute irure dolor in
    //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //       culpa qui officia deserunt mollit anim id est laborum.
    //       <br />
    //       <Button variant="primary" onClick={handleTourViewClick}>View Tour Details</Button>
    //     </Accordion.Body>
    //   </Accordion.Item>

    //   <Accordion.Item eventKey="1">
    //     <Accordion.Header>Tour B</Accordion.Header>
    //     <Accordion.Body>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //       aliquip ex ea commodo consequat. Duis aute irure dolor in
    //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //       culpa qui officia deserunt mollit anim id est laborum.
    //       <br />
    //       <Button variant="primary" onClick={handleTourViewClick}>View Tour Details</Button>
    //     </Accordion.Body>
    //   </Accordion.Item>
    // </Accordion>
    // )
  };

  return (
    <Container>
      <Container display="flex">
        <Row className="justify-content-md-center">
          <CardCol md={4}>
            <ActionsContainer>
              <TourForm />
            </ActionsContainer>
          </CardCol>
          {/* <CardCol>
        <ActionsContainer>
          
        </ActionsContainer>
        </CardCol> */}
          <CardCol md={4}>
            <ActionsContainer>
              <FinanceDashboard />
            </ActionsContainer>
          </CardCol>
        </Row>
      </Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Accordion>{renderTourList()}</Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

const ActionsContainer = styled(Container)`
  margin-top: 8%;
  margin-bottom: 8%;
`;

const CardCol = styled(Col)`
  justify-content: center;
  margin-top: 1%;
  margin-bottom: 1%;
`;
