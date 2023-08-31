import { styled } from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Navigation() {

  const {user, setUser} = useState('authenticated');
  const authenticated = useSelector(state => state.auth.authenticated);
  // setUser(true);

  const navigate = useNavigate();

  function handleReturnHome () {
    if (authenticated) {
      navigate("/homepage")
    } else{
      navigate("/");
    }
    
  }

  function handleSignOut () {
    //dispatch signOut action
    // setUser('not authenticated');
    navigate("/");
  

  }

  const renderSignOut = () => {
    /* verify if user is authenticated */
    if (authenticated) {
      return (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homepage" onClick={handleReturnHome}>Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/" onClick={handleSignOut}>Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      ) 
    }
  }

  return (
    
          <Navbar expand="xl" className="bg-body-tertiary" >
            <Container>
      {/* <NavContainer> */}
      
        <Navbar.Brand onClick={handleReturnHome}>TourBlues</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        {renderSignOut(user)}
        
        {/* </NavContainer> */}
        </Container>
    </Navbar>
      
);
}

export default Navigation;

// Navbar = styled.div`
//   margin-left: 20px;
// `

const NavContainer = styled.div`
  margin-left: 10px;
  text-align: left;
  width: 100%;
  display: block;
  float: left;
`