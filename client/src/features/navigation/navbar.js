import { styled } from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { signOut } from '../auth/authSlice';

const Navigation = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const artistName = useSelector((state) => state.auth.artistName);
  const dispatch = useDispatch();
  useEffect(() => {}, [authenticated]);

  const navigate = useNavigate();

  const handleReturnHome = () => {
    if (authenticated) {
      navigate('/homepage');
    } else {
      navigate('/');
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/');
  };

  const navButtons = () => {
    if (authenticated) {
      return (
        <Form inline="true">
          <Row>
            <Col xs="auto">
              <HomeButton
                variant="link"
                type="button"
                onClick={handleReturnHome}
              >
                Home
              </HomeButton>
            </Col>
            <Col xs="auto">
              <SignOutButton
                variant="link"
                type="button"
                onClick={handleSignOut}
              >
                Sign Out
              </SignOutButton>
            </Col>
            <Col xs="auto">
              <ArtistName>
                <h6>Artist: {artistName}</h6>
              </ArtistName>
            </Col>
          </Row>
        </Form>
      );
    }
  };

  const renderLinks = () => {
    /* verify if user is authenticated */
    if (authenticated) {
      console.log('authenticated in renderLinks function');
      return (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>{navButtons()}</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      );
    }
    console.log('not authenticated');
  };

  return (
    <Navbar expand="xl" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={handleReturnHome}>TourBlues</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {renderLinks()}
      </Container>
    </Navbar>
  );
};

export default Navigation;

const ArtistName = styled.div`
  justify-content: center;
  margin-top: 8px;
`;

const HomeButton = styled(Button)`
  margin-left: 5px;
`;

const SignOutButton = styled(Button)`
  margin-left: 5px;
`;
