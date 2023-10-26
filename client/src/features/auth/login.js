import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Container from 'react-bootstrap/esm/Container';
import { signIn } from './authSlice';

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleFormSubmit = (data) => {
    dispatch(
      signIn({
        data,
        callback: () => {
          navigate('/homepage');
        },
      })
    );
  };

  return (
    // <LoginContainer>
    // <Container className='justify-content-start'>
    <LoginContainer>
      <h4 className="login-header">Login to TourBlues!</h4>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            {...register('email', { required: true })}
            placeholder="Enter email"
          />
          {errors.email?.message}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...register('password', { required: true })}
            placeholder="Password"
          />
          {errors.password?.message}
        </Form.Group>
        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Text className="text-muted">No Account?</Form.Text>
          <br />
          <Button variant="secondary" type="button" onClick={handleSignUpClick}>
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    </LoginContainer>
  );
};

export default LogIn;

const LoginContainer = styled(Container)`
  margin-top: 25px;
  width: 270px;
  justify-content: left;
  text-align: -webkit-auto;
`;
