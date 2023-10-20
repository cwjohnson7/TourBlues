import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import Container from 'react-bootstrap/esm/Container';
import { signIn } from './authSlice';

function LogIn() {
  // const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleFormSubmit = () => {
    dispatch(
      // signIn(data, () => {
      //   navigate("/homepage");
      // })
      signIn({ authenticated: 'authenticated' })
    );
    navigate('/homepage');
  };

  return (
    // <LoginContainer>
    // <Container className='justify-content-start'>
    <LoginContainer>
      <h4 className="login-header">Login to TourBlues!</h4>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Text className="text-muted">No Account?</Form.Text>
          <br />
          <Button variant="secondary" type="submit" onClick={handleSignUpClick}>
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    </LoginContainer>
  );
}

export default LogIn;

const LoginContainer = styled(Container)`
  margin-top: 25px;
  width: 270px;
  justify-content: left;
  text-align: -webkit-auto;
`;
