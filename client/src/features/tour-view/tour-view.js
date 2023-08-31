import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function TourView() {
  const navigate = useNavigate();

  const handleHomePageClick = () => {
    navigate("/homepage")
  }

  return (
    <TourViewContainer>
      <h3>Tour (Based on tourId)</h3>
    <Accordion>
      <Accordion.Item eventKey="0">
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
      </Accordion.Item>
    </Accordion>
    <TourViewButton variant="primary" onClick={handleHomePageClick}>Back to Homepage</TourViewButton>
    </TourViewContainer>
  );
}

export default TourView;

const TourViewButton = styled(Button)`
margin-top: 20px;
`

const TourViewContainer = styled(Container)`
margin-top: 20px;
`