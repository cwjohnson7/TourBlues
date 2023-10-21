import { styled } from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Navigation() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  console.log(authenticated);
  console.log('navbar');
  // setUser(true);

  const navigate = useNavigate();

  const handleReturnHome = () => {
    if (authenticated) {
      navigate('/homepage');
    } else {
      navigate('/');
    }
  };

  const handleSignOut = () => {
    // dispatch signOut action
    // setUser('not authenticated');
    navigate('/');
  };

  const navButtons = () => {
    if (authenticated) {
      return (
        <Form inline>
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
          </Row>
        </Form>
      );
    }
  };

  const renderLinks = () => {
    /* verify if user is authenticated */
    if (authenticated === 'authenticated') {
      console.log('authenticated in renderSignOut');
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
}

export default Navigation;

const HomeButton = styled(Button)`
  margin-left: 5px;
`;

const SignOutButton = styled(Button)`
  margin-left: 5px;
`;
